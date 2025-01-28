import { motion } from 'framer-motion';
import { BookOpen, Star, Award, TrendingUp, BarChart2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: BookOpen, label: 'Enrolled Courses', value: '4' },
  { icon: Star, label: 'Average Rating', value: '4.8' },
  { icon: Award, label: 'Certifications', value: '2' },
  { icon: Users, label: 'Study Groups', value: '3' },
];

const courses = [
  {
    id: 1,
    title: 'Advanced Web Development',
    progress: 75,
    nextLesson: 'React Hooks Deep Dive',
    instructor: 'Dr. Sarah Chen',
    dueDate: '2024-03-20',
  },
  {
    id: 2,
    title: 'Healthcare Management',
    progress: 45,
    nextLesson: 'Hospital Administration',
    instructor: 'Prof. James Wilson',
    dueDate: '2024-03-25',
  },
];

const achievements = [
  {
    id: 1,
    title: 'Fast Learner',
    description: 'Completed 5 lessons in one day',
    icon: TrendingUp,
    date: '2024-03-15',
  },
  {
    id: 2,
    title: 'Perfect Score',
    description: 'Achieved 100% in module assessment',
    icon: Star,
    date: '2024-03-10',
  },
];

export default function DashboardPage() {
  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-400">Track your progress and achievements</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="cosmic-card"
          >
            <div className="flex items-center space-x-4">
              <stat.icon className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Progress */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {courses.map((course) => (
          <div key={course.id} className="cosmic-card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                <p className="text-gray-400">Instructor: {course.instructor}</p>
              </div>
              <Link to={`/courses/${course.id}`} className="cosmic-button">
                Continue
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{course.progress}% Complete</span>
                <span>Due: {course.dueDate}</span>
              </div>
              <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Next: {course.nextLesson}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="cosmic-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Achievements</h2>
          <Link to="/achievements" className="text-blue-400 hover:text-blue-300">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ x: 5 }}
              className="flex items-center space-x-4 p-4 rounded-lg bg-blue-500/10"
            >
              <div className="p-2 rounded-full bg-blue-500/20">
                <achievement.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
              <span className="text-sm text-gray-400">{achievement.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}