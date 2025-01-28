import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cosmic-card"
      >
        <div className="flex items-center space-x-4 mb-8">
          <Cookie className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">Cookie Policy</h1>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-gray-300">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us make the site work better for you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-400">Essential Cookies</h3>
                <p className="text-gray-300">Required for the website to function properly, including authentication and security.</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-400">Preference Cookies</h3>
                <p className="text-gray-300">Remember your settings and preferences for a better experience.</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-400">Analytics Cookies</h3>
                <p className="text-gray-300">Help us understand how visitors use our website.</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-400">Marketing Cookies</h3>
                <p className="text-gray-300">Used to deliver relevant advertisements and track their effectiveness.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Managing Cookies</h2>
            <p className="text-gray-300">
              You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-300">
              We use third-party services that may set cookies on your device. These services include analytics, advertising, and social media integration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Updates to This Policy</h2>
            <p className="text-gray-300">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about our use of cookies, please contact us at:
              <br />
              Email: privacy@skillstream.com
              <br />
              Address: London, United Kingdom
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}