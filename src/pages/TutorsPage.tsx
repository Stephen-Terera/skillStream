import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const tutors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    expertise: ['Web Development', 'React', 'Node.js'],
    rating: 4.9,
    students: 1500,
    bio: 'Former Google engineer with 10+ years of experience in full-stack development.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    courses: [
      { id: 1, title: 'Advanced Web Development', students: 750 },
      { id: 2, title: 'React Masterclass', students: 500 },
    ]
  },
  {
    id: 2,
    name: 'Prof. James Wilson',
    expertise: ['Healthcare Management', 'Medical Administration'],
    rating: 4.8,
    students: 1200,
    bio: 'Healthcare administrator with 15+ years of experience in hospital management.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    courses: [
      { id: 3, title: 'Healthcare Leadership', students: 600 },
      { id: 4, title: 'Medical Administration Fundamentals', students: 450 },
    ]
  },
  // Add more tutors as needed
];

export default function TutorsPage() {
  const [selectedTutor, setSelectedTutor] = useState(null);

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Expert Tutors
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <motion.div
            key={tutor.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            className="cosmic-card relative group"
          >
            {/* Profile Image */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse group-hover:animate-none" />
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-full h-full object-cover rounded-full border-2 border-transparent group-hover:border-blue-400 transition-all duration-300 relative z-10"
              />
            </div>

            {/* Tutor Info */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <span>{tutor.rating}</span>
                <span className="text-gray-400">({tutor.students} students)</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {tutor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSelectedTutor(tutor)}
                className="cosmic-button"
              >
                View Profile
              </button>
              <button className="cosmic-button">
                <MessageSquare size={18} />
                <span>Chat</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tutor Profile Modal */}
      {selectedTutor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTutor(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cosmic-card max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start space-x-6">
              <img
                src={selectedTutor.avatar}
                alt={selectedTutor.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedTutor.name}</h2>
                <p className="text-gray-300 mb-4">{selectedTutor.bio}</p>
                <div className="grid grid-cols-2 gap-4">
                  {selectedTutor.courses.map((course) => (
                    <div key={course.id} className="cosmic-card">
                      <h4 className="font-semibold mb-2">{course.title}</h4>
                      <p className="text-sm text-gray-400">{course.students} students</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}