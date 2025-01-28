import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, RefreshCw } from 'lucide-react';
import { fetchRecommendations } from '../store/slices/courseRecommendationsSlice';
import type { RootState } from '../store/store';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function CourseRecommendations() {
  const dispatch = useDispatch();
  const { courses, loading, error, lastUpdated } = useSelector(
    (state: RootState) => state.recommendations
  );

  useEffect(() => {
    if (!lastUpdated) {
      dispatch(fetchRecommendations('current-user-id'));
    }
  }, [dispatch, lastUpdated]);

  const handleRefresh = () => {
    dispatch(fetchRecommendations('current-user-id'));
  };

  return (
    <div className="cosmic-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRefresh}
          className="cosmic-button"
          disabled={loading}
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </motion.button>
      </div>

      {error && (
        <div className="text-red-400 mb-4">
          Error loading recommendations: {error}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {courses.map((course) => (
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

              <button className="cosmic-button w-full justify-center">
                Learn More
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}