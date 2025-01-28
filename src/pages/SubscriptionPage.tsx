import { motion } from 'framer-motion';
import { Check, Star, Users, Rocket, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Standard',
    price: 30,
    icon: Star,
    features: [
      'Access to 2 courses',
      'Basic support',
      'Course completion certificates',
      'Access to community forums',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: 50,
    icon: Rocket,
    features: [
      'Unlimited course access',
      'Priority support',
      'Course completion certificates',
      'Access to community forums',
      'Download course materials',
      'Offline viewing',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 100,
    icon: Crown,
    features: [
      'All Pro features',
      '24/7 priority support',
      'One-on-one mentoring',
      'Career guidance',
      'Industry networking events',
      'Early access to new courses',
      'Custom learning paths',
    ],
    popular: false,
  },
  {
    name: 'Corporate',
    price: 300,
    icon: Users,
    features: [
      'Up to 10 user accounts',
      'Custom learning paths',
      'Team progress tracking',
      'Dedicated account manager',
      'Custom reporting',
      'API access',
      'SSO integration',
    ],
    popular: false,
    perUser: 25,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Choose Your Learning Journey
        </h1>
        <p className="text-xl text-gray-300">
          Unlock your potential with our flexible subscription plans
        </p>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`cosmic-card relative group ${
              plan.popular ? 'border-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-sm bg-blue-500 text-white">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <plan.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              {plan.perUser && (
                <p className="text-sm text-gray-400 mt-1">
                  +${plan.perUser}/user/month after 10 users
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Subscribe Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full cosmic-button justify-center py-3"
            >
              Subscribe Now
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400">
          All plans include a 14-day money-back guarantee
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Need a custom plan? <a href="#" className="text-blue-400 hover:text-blue-300">Contact us</a>
        </p>
      </motion.div>
    </div>
  );
}