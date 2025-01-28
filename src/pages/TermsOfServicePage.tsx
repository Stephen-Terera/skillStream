import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 px-4 max-w-3xl mx-auto pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cosmic-card"
      >
        <div className="flex items-center space-x-4 mb-8">
          <FileText className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-300">
              By accessing or using SkillStream, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 16 years old to use the service</li>
              <li>One person may not maintain multiple accounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Content and Conduct</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Users must respect intellectual property rights</li>
              <li>No harmful or malicious content</li>
              <li>No spamming or automated access</li>
              <li>No impersonation or misrepresentation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Payments and Refunds</h2>
            <p className="text-gray-300">
              All payments are processed securely through our payment providers. Refunds are available within 14 days of purchase if you are unsatisfied with the course content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="text-gray-300">
              All content on SkillStream, including courses, materials, and platform features, is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Termination</h2>
            <p className="text-gray-300">
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="text-gray-300">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or platform notification.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}