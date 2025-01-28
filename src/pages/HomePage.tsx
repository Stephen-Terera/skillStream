import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Award, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredCourses = [
  {
    id: 1,
    title: 'Advanced Web Development',
    instructor: 'Dr. Sarah Chen',
    rating: 4.9,
    students: 1500,
    price: 199,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Healthcare Management',
    instructor: 'Prof. James Wilson',
    rating: 4.8,
    students: 1200,
    price: 149,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    instructor: 'Dr. Emily Brown',
    rating: 4.7,
    students: 980,
    price: 179,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-[80vh] flex items-center justify-center px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Unlock Your Potential and Align Your Skills with SkillStream
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Discover, learn, and Build Your Future with our cutting-edge online courses.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/courses"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                       hover:from-purple-500 hover:to-blue-600 transition-all duration-300
                       flex items-center space-x-2 group"
            >
              <span>Explore Courses</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/skillmap"
              className="px-8 py-3 rounded-full border border-blue-400 hover:border-purple-400 
                       transition-all duration-300 flex items-center space-x-2"
            >
              <span>Try SkillMap</span>
              <Rocket size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Courses Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-8 text-center"
          >
            Featured Courses
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
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

                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center space-x-1 text-sm text-gray-400">
                    <Users size={16} />
                    <span>{course.students} students</span>
                  </span>
                  <span className="text-xl font-bold">£{course.price}</span>
                </div>

                <Link
                  to={`/courses/${course.id}`}
                  className="cosmic-button w-full justify-center"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="p-6 rounded-lg bg-gradient-to-b from-blue-500/10 to-purple-500/10 
                     border border-blue-500/20 backdrop-blur-sm"
          >
            <Star className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p className="text-gray-300">Adaptive courses that align with your career goals and learning pace.</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-lg bg-gradient-to-b from-blue-500/10 to-purple-500/10 
                     border border-blue-500/20 backdrop-blur-sm"
          >
            <Users className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-300">Learn from industry professionals with real-world experience.</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-lg bg-gradient-to-b from-blue-500/10 to-purple-500/10 
                     border border-blue-500/20 backdrop-blur-sm"
          >
            <Award className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Recognized Certifications</h3>
            <p className="text-gray-300">Earn industry-recognized certificates upon course completion.</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <Link
            to="/auth"
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-full 
                     bg-gradient-to-r from-blue-500 to-purple-600 
                     hover:from-purple-500 hover:to-blue-600 transition-all duration-300"
          >
            <span>Get Started</span>
            <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}