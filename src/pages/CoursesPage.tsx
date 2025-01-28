import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, BookOpen, Clock, Users, Target, Award, CheckCircle, Brain, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'All',
  'Tech',
  'Manufacturing',
  'Healthcare',
  'Retail',
  'Agriculture',
  'Hospitality'
];

const courses = [
  {
    id: 1,
    title: 'Advanced Web Development',
    instructor: 'Sarah Chen',
    level: 'Advanced',
    duration: '12 weeks',
    students: 1234,
    rating: 4.8,
    price: 199,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Healthcare Management',
    instructor: 'Dr. James Wilson',
    level: 'Intermediate',
    duration: '8 weeks',
    students: 856,
    rating: 4.6,
    price: 149,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  // Add more courses as needed
];

interface CourseDetails {
  id: number;
  title: string;
  instructor: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  description: string;
  learningOutcomes: string[];
  prerequisites: string[];
  careerPaths: string[];
  skills: string[];
  modules: {
    title: string;
    topics: string[];
    duration: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    comment: string;
  }[];
  certifications: string[];
}

const courseDetails: CourseDetails[] = [
  {
    id: 1,
    title: 'Advanced Web Development',
    instructor: 'Sarah Chen',
    level: 'Advanced',
    duration: '12 weeks',
    students: 1234,
    rating: 4.8,
    price: 199,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Master modern web development with this comprehensive course. Learn advanced concepts in React, Node.js, and cloud deployment while building production-ready applications. Perfect for developers looking to advance their careers in full-stack development.',
    learningOutcomes: [
      'Build scalable full-stack applications using modern technologies',
      'Implement advanced state management and performance optimization',
      'Deploy and manage cloud-based applications',
      'Write clean, maintainable, and tested code',
      'Work with modern development workflows and tools'
    ],
    prerequisites: [
      'Basic JavaScript knowledge',
      'Understanding of HTML/CSS',
      'Familiarity with React basics'
    ],
    careerPaths: [
      'Senior Frontend Developer',
      'Full-Stack Engineer',
      'Technical Lead',
      'Software Architect'
    ],
    skills: [
      'React.js',
      'Node.js',
      'TypeScript',
      'Cloud Deployment',
      'System Design',
      'Performance Optimization'
    ],
    modules: [
      {
        title: 'Advanced React Patterns',
        topics: [
          'Custom Hooks',
          'Performance Optimization',
          'State Management',
          'Testing Strategies'
        ],
        duration: '2 weeks'
      },
      {
        title: 'Backend Development',
        topics: [
          'RESTful APIs',
          'Database Design',
          'Authentication',
          'Security Best Practices'
        ],
        duration: '3 weeks'
      }
    ],
    testimonials: [
      {
        name: 'John Smith',
        role: 'Senior Developer at Tech Corp',
        comment: 'This course transformed my understanding of web development. The practical projects were invaluable.'
      }
    ],
    certifications: [
      'Professional Web Developer Certificate',
      'Cloud Development Associate'
    ]
  }
  // Add more course details as needed
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseDetails | null>(null);

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Search and Filter Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cosmic-input w-full pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-blue-400" />
            <select className="cosmic-input">
              <option>Sort by</option>
              <option>Most Popular</option>
              <option>Highest Rated</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-500/10 hover:bg-blue-500/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            className="cosmic-card group"
          >
            <div className="relative mb-4 rounded-lg overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm">{course.rating}</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-400 mb-4">by {course.instructor}</p>

            <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
              <div className="flex items-center space-x-1">
                <BookOpen size={16} />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={16} />
                <span>{course.students}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">${course.price}</span>
              <button
                onClick={() => setSelectedCourse(courseDetails.find(d => d.id === course.id) || null)}
                className="cosmic-button"
              >
                View Course
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Details Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="container mx-auto px-4 py-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="cosmic-card max-w-4xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedCourse.title}</h2>
                    <p className="text-xl text-gray-400">by {selectedCourse.instructor}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {/* Course Overview */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Course Overview</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedCourse.description}</p>
                    </div>

                    {/* Learning Outcomes */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-400" />
                        What You'll Learn
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCourse.learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Course Modules */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                      <div className="space-y-4">
                        {selectedCourse.modules.map((module, index) => (
                          <div key={index} className="cosmic-card">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold">{module.title}</h4>
                              <span className="text-sm text-gray-400">{module.duration}</span>
                            </div>
                            <ul className="list-disc list-inside text-gray-300">
                              {module.topics.map((topic, i) => (
                                <li key={i}>{topic}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonials */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Student Testimonials</h3>
                      <div className="space-y-4">
                        {selectedCourse.testimonials.map((testimonial, index) => (
                          <div key={index} className="cosmic-card">
                            <p className="italic mb-2">"{testimonial.comment}"</p>
                            <div className="text-sm text-gray-400">
                              <p className="font-semibold">{testimonial.name}</p>
                              <p>{testimonial.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    {/* Course Info Card */}
                    <div className="cosmic-card sticky top-24">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold mb-2">${selectedCourse.price}</div>
                        <button className="cosmic-button w-full justify-center">
                          Enroll Now
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Prerequisites</h4>
                          <ul className="space-y-2 text-gray-300">
                            {selectedCourse.prerequisites.map((req, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Skills You'll Gain</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourse.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Career Paths</h4>
                          <ul className="space-y-2 text-gray-300">
                            {selectedCourse.careerPaths.map((path, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Brain className="w-4 h-4 text-purple-400" />
                                <span>{path}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Certifications</h4>
                          <ul className="space-y-2 text-gray-300">
                            {selectedCourse.certifications.map((cert, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Award className="w-4 h-4 text-yellow-400" />
                                <span>{cert}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}