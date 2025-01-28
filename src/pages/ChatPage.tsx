import { motion } from 'framer-motion';
import { Send, Search, User, Clock, Star, Plus } from 'lucide-react';
import { useState } from 'react';

const contacts = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'online',
    lastMessage: 'Great progress on the React module!',
    time: '2m ago'
  },
  {
    id: 2,
    name: 'Prof. James Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'offline',
    lastMessage: 'Let me know if you have questions about the assignment.',
    time: '1h ago'
  },
  // Add more contacts as needed
];

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="pt-16 h-screen">
      <div className="h-full flex">
        {/* Contacts Sidebar */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 border-r border-blue-500/20 overflow-y-auto"
        >
          <div className="p-4">
            {/* New Chat Button */}
            <button 
              className="cosmic-button w-full justify-center mb-4"
              onClick={() => {/* Handle new chat */}}
            >
              <Plus size={20} />
              <span>New Chat</span>
            </button>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search contacts..."
                className="cosmic-input w-full pl-10"
              />
            </div>

            <div className="space-y-2">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedContact.id === contact.id
                      ? 'bg-blue-500/20'
                      : 'hover:bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0B1026] ${
                          contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{contact.name}</h4>
                      <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                    </div>
                    <span className="text-xs text-gray-400">{contact.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-blue-500/20">
            <div className="flex items-center space-x-3">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{selectedContact.name}</h3>
                <span className="text-sm text-gray-400">
                  {selectedContact.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Add message components here */}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-blue-500/20">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="cosmic-input flex-1"
              />
              <button className="cosmic-button">
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}