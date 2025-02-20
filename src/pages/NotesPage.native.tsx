import { 
  ScrollView, FlexboxLayout, Label, Button, GridLayout,
  TextField, ListView, ItemEventData
} from '@nativescript/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Note } from '../types';
import { offlineManager } from '../utils/offline';
import { biometricManager } from '../utils/biometrics';

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    // Load cached notes on component mount
    loadCachedNotes();
    // Setup biometric authentication
    setupBiometricAuth();
  }, []);

  const loadCachedNotes = async () => {
    const cachedNotes = await offlineManager.loadOfflineData('notes');
    if (cachedNotes) {
      dispatch({ type: 'notes/setNotes', payload: cachedNotes });
    }
  };

  const setupBiometricAuth = async () => {
    const isAvailable = await biometricManager.isBiometricAvailable();
    if (isAvailable) {
      const isAuthenticated = await biometricManager.authenticate(
        'Authenticate to access your notes'
      );
      if (!isAuthenticated) {
        // Handle authentication failure
        return;
      }
    }
  };

  const onNoteSelect = (args: ItemEventData) => {
    const selectedNote = notes[args.index];
    setCurrentNote(selectedNote);
    setIsEditing(true);
  };

  const saveNote = async () => {
    if (!currentNote) return;

    try {
      // Save locally first
      await offlineManager.saveOfflineData('notes', currentNote);
      
      // Queue for sync
      offlineManager.queueForSync({
        type: 'note',
        action: isEditing ? 'update' : 'create',
        data: currentNote
      });

      dispatch({
        type: isEditing ? 'notes/updateNote' : 'notes/addNote',
        payload: currentNote
      });

      setIsEditing(false);
      setCurrentNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <GridLayout rows="auto, *" className="p-4">
      {/* Search Bar */}
      <FlexboxLayout row={0} className="m-b-10">
        <TextField
          hint="Search notes..."
          text={searchQuery}
          onTextChange={(args) => setSearchQuery(args.object.text)}
          className="input"
        />
      </FlexboxLayout>

      {/* Notes List */}
      {!isEditing ? (
        <ListView
          row={1}
          items={notes.filter(note => 
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          onItemTap={onNoteSelect}
          className="list-group"
        >
          <ListView.itemTemplate>
            <FlexboxLayout flexDirection="column" padding={10}>
              <Label text="{{ title }}" className="text-lg font-bold" />
              <Label text="{{ updatedAt }}" className="text-sm text-gray-400" />
            </FlexboxLayout>
          </ListView.itemTemplate>
        </ListView>
      ) : (
        <ScrollView row={1}>
          <FlexboxLayout flexDirection="column" padding={10}>
            <TextField
              hint="Note title"
              text={currentNote?.title || ''}
              onTextChange={(args) => 
                setCurrentNote(prev => ({ ...prev!, title: args.object.text }))
              }
              className="input m-b-10"
            />
            <TextField
              hint="Note content"
              text={currentNote?.content || ''}
              onTextChange={(args) =>
                setCurrentNote(prev => ({ ...prev!, content: args.object.text }))
              }
              className="input m-b-10"
              editable={true}
              multiline={true}
            />
            <FlexboxLayout>
              <Button text="Save" onTap={saveNote} className="btn-primary" />
              <Button 
                text="Cancel" 
                onTap={() => {
                  setIsEditing(false);
                  setCurrentNote(null);
                }}
                className="btn-secondary m-l-10"
              />
            </FlexboxLayout>
          </FlexboxLayout>
        </ScrollView>
      )}

      {/* Add Note Button */}
      {!isEditing && (
        <Button
          text="+"
          onTap={() => {
            setCurrentNote({
              id: Date.now().toString(),
              title: '',
              content: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              favorite: false,
              tags: []
            });
            setIsEditing(true);
          }}
          className="fab-button"
        />
      )}
    </GridLayout>
  );
}