import { motion } from 'framer-motion';
import { Rocket, Star, BookOpen, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const skillPaths = [
  {
    id: 1,
    title: 'Web Development',
    level: 'Intermediate',
    progress: 65,
    nextMilestone: 'Full-Stack Developer',
    recommendedCourses: [
      { id: 1, title: 'Advanced React Patterns', instructor: 'Dr. Sarah Chen' },
      { id: 2, title: 'Node.js Microservices', instructor: 'Prof. James Wilson' },
    ],
    careerOpportunities: [
      'Frontend Developer',
      'Backend Developer',
      'Full-Stack Developer',
      'DevOps Engineer',
    ],
  },
  {
    id: 2,
    title: 'Healthcare Management',
    level: 'Beginner',
    progress: 30,
    nextMilestone: 'Department Manager',
    recommendedCourses: [
      { id: 3, title: 'Healthcare Leadership', instructor: 'Dr. Emily Brown' },
      { id: 4, title: 'Medical Administration', instructor: 'Prof. Michael Lee' },
    ],
    careerOpportunities: [
      'Healthcare Administrator',
      'Clinical Manager',
      'Department Director',
      'Hospital Executive',
    ],
  },
];

export default function SkillMapPage() {
  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Your SkillMap Journey
        </h1>
        <p className="text-xl text-gray-300">
          Discover your potential career paths and recommended learning routes
        </p>
      </motion.div>

      {/* Skill Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="cosmic-card relative overflow-hidden group"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold">{path.title}</h2>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                    {path.level}
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex space-x-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/20"
                  >
                    <Star className="w-4 h-4 text-blue-400" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500/20"
                  >
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to {path.nextMilestone}</span>
                  <span>{path.progress}%</span>
                </div>
                <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${path.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                  Recommended Courses
                </h3>
                <div className="space-y-3">
                  {path.recommendedCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      whileHover={{ x: 5 }}
                      className="p-3 rounded-lg bg-blue-500/10 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-gray-400">{course.instructor}</p>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="cosmic-button text-sm"
                      >
                        Enroll
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Career Opportunities */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Rocket className="w-5 h-5 mr-2 text-purple-400" />
                  Career Opportunities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {path.careerOpportunities.map((career, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm"
                    >
                      {career}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Award className="w-10 h-10 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold">Keep Growing!</h3>
              <p className="text-gray-400">Complete courses to unlock new career opportunities</p>
            </div>
          </div>
          <Link to="/courses" className="cosmic-button">
            Browse Courses
          </Link>
        </div>
      </motion.div>
    </div>
  );
}