import { motion } from 'framer-motion';
import { 
  Plus, Search, Settings, Star, Trash2, Share2, FolderPlus, 
  Image, Camera, Upload, FileText, Book, Layout, Bell
} from 'lucide-react';
import { useState } from 'react';

const noteTemplates = [
  {
    id: 1,
    name: 'Classic Lined',
    price: 0,
    preview: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Grid Paper',
    price: 1.99,
    preview: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const notes = [
  {
    id: 1,
    title: 'Web Development Notes',
    type: 'notebook',
    lastModified: '2024-03-19T10:30:00Z',
    favourite: true
  },
  {
    id: 2,
    title: 'React Hooks Flashcards',
    type: 'flashcards',
    lastModified: '2024-03-18T15:45:00Z',
    favourite: false
  }
];

export default function NotesPage() {
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewMenu, setShowNewMenu] = useState(false);

  const newOptions = [
    { icon: Book, label: 'Notebook' },
    { icon: Layout, label: 'Flash Cards' },
    { icon: FolderPlus, label: 'Folder' },
    { icon: Image, label: 'Image' },
    { icon: Camera, label: 'Scan Documents' },
    { icon: Camera, label: 'Take Photo' },
    { icon: Upload, label: 'Import' },
    { icon: FileText, label: 'Quick Note' }
  ];

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold">Notes</h1>
        
        <div className="flex items-center space-x-4">
          <button className="cosmic-button relative" onClick={() => setShowNewMenu(!showNewMenu)}>
            <Plus size={20} />
            <span>New...</span>
          </button>

          {showNewMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full right-0 mt-2 w-48 cosmic-card z-50"
            >
              {newOptions.map((option) => (
                <button
                  key={option.label}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  <option.icon size={18} />
                  <span>{option.label}</span>
                </button>
              ))}
            </motion.div>
          )}

          <button className="cosmic-button">
            <Bell size={20} />
          </button>

          <button className="cosmic-button">
            <Settings size={20} />
          </button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cosmic-input w-full pl-10"
          />
        </div>

        <select className="cosmic-input">
          <option>Sort by Date</option>
          <option>Sort by Name</option>
          <option>Sort by Type</option>
        </select>

        <div className="flex space-x-2">
          <button
            className={`cosmic-button ${view === 'grid' ? 'bg-blue-500' : ''}`}
            onClick={() => setView('grid')}
          >
            <Layout size={20} />
          </button>
          <button
            className={`cosmic-button ${view === 'list' ? 'bg-blue-500' : ''}`}
            onClick={() => setView('list')}
          >
            <FileText size={20} />
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            className="cosmic-card"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <button className={`text-${note.favourite ? 'yellow' : 'gray'}-400 hover:text-yellow-400 transition-colors`}>
                <Star size={20} fill={note.favourite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              Last modified: {new Date(note.lastModified).toLocaleDateString()}
            </p>

            <div className="flex space-x-2">
              <button className="cosmic-button flex-1">
                Open
              </button>
              <button className="cosmic-button">
                <Share2 size={18} />
              </button>
              <button className="cosmic-button text-red-400 hover:text-red-300">
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Templates Shop */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold mb-6">Note Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {noteTemplates.map((template) => (
            <div key={template.id} className="cosmic-card">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
              <div className="flex justify-between items-center">
                <span>{template.price === 0 ? 'Free' : `£${template.price}`}</span>
                <button className="cosmic-button">
                  {template.price === 0 ? 'Use' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}