import {
  ScrollView,
  FlexboxLayout,
  Label,
  Button,
  Image,
  TextField,
  ListView,
  ItemEventData,
  Screen,
  ObservableArray
} from '@nativescript/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { offlineManager } from '../utils/offline';
import { notificationManager } from '../utils/notifications';

interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ObservableArray<ChatMessage>>(new ObservableArray([]));
  const [messageText, setMessageText] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    loadCachedMessages();
    setupNotifications();
    checkConnectivity();
  }, []);

  const loadCachedMessages = async () => {
    const cached = await offlineManager.loadOfflineData('chat_messages');
    if (cached) {
      messages.push(...cached);
    }
  };

  const setupNotifications = async () => {
    await notificationManager.registerPushNotifications(currentUser.id);
    notificationManager.onPushNotificationReceived((notification) => {
      if (notification.type === 'chat_message') {
        messages.push({
          id: notification.messageId,
          text: notification.message,
          sender: notification.senderId,
          timestamp: new Date().toISOString(),
          status: 'delivered'
        });
      }
    });
  };

  const checkConnectivity = () => {
    // Monitor connectivity changes
    connectivity.startMonitoring((newConnectionType) => {
      setIsOffline(newConnectionType === connectivity.connectionType.none);
    });
  };

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: currentUser.id,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    // Add to local messages immediately
    messages.push(newMessage);
    setMessageText('');

    try {
      if (isOffline) {
        // Queue for later sync
        await offlineManager.queueForSync({
          type: 'chat_message',
          action: 'send',
          data: newMessage
        });
      } else {
        // Send to server
        // await api.sendMessage(newMessage);
        
        // Update message status
        const index = messages.indexOf(newMessage);
        if (index !== -1) {
          messages.setItem(index, { ...newMessage, status: 'delivered' });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const index = messages.indexOf(newMessage);
      if (index !== -1) {
        messages.setItem(index, { ...newMessage, status: 'failed' });
      }
    }
  };

  const retryFailedMessage = async (message: ChatMessage) => {
    const index = messages.indexOf(message);
    if (index !== -1) {
      messages.setItem(index, { ...message, status: 'sent' });
      await sendMessage();
    }
  };

  return (
    <Screen>
      <FlexboxLayout flexDirection="column" height="100%">
        {/* Messages List */}
        <ListView
          items={messages}
          flexGrow={1}
          className="chat-messages"
          separatorColor="transparent"
        >
          <ListView.itemTemplate>
            <FlexboxLayout
              flexDirection="row"
              justifyContent="{{ sender === currentUser.id ? 'flex-end' : 'flex-start' }}"
              padding={10}
            >
              <FlexboxLayout
                className="{{ sender === currentUser.id ? 'message-sent' : 'message-received' }}"
                padding={10}
                borderRadius={8}
              >
                <Label text="{{ text }}" textWrap={true} />
                <Label
                  text="{{ timestamp | dateFormat }}"
                  className="message-time"
                  fontSize={12}
                />
                {/* Message Status Indicator */}
                <Label
                  text="{{ status === 'failed' ? '❌' : status === 'delivered' ? '✓✓' : '✓' }}"
                  visibility="{{ sender === currentUser.id ? 'visible' : 'collapsed' }}"
                  className="message-status"
                />
              </FlexboxLayout>
            </FlexboxLayout>
          </ListView.itemTemplate>
        </ListView>

        {/* Message Input */}
        <FlexboxLayout className="message-input" padding={10}>
          <TextField
            hint="Type a message..."
            text={messageText}
            onTextChange={(args) => setMessageText(args.object.text)}
            flexGrow={1}
            returnKeyType="send"
            onReturnPress={sendMessage}
          />
          <Button
            text="Send"
            onTap={sendMessage}
            isEnabled={messageText.trim().length > 0}
            className="send-button"
          />
        </FlexboxLayout>

        {/* Offline Indicator */}
        {isOffline && (
          <FlexboxLayout className="offline-indicator" padding={5}>
            <Label text="You're offline. Messages will be sent when you're back online." />
          </FlexboxLayout>
        )}
      </FlexboxLayout>
    </Screen>
  );
}