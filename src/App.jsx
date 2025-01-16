import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Google Forms URL
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdq-VSTfs2KmeLeF1L4Aftv_JaRfHrGCiGOZ1icZHYjsteBHg/formResponse';
  const GOOGLE_FORM_EMAIL_ID = 'entry.75332481';

  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const formData = new FormData();
      formData.append(GOOGLE_FORM_EMAIL_ID, email);

      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      // Since we're using no-cors, we won't get a proper response
      // We'll assume success if no error was thrown
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <nav className="w-full flex justify-end mb-8">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </nav>

        <main className="w-full flex flex-col items-center justify-center space-y-8 mt-16">
          <img
            src={darkMode ? "/dark-logo.png" : "/light-logo.png"}
            alt="Court IQ Logo"
            className="w-32 h-32"
          />
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center">
            Serving soon!
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-md">
            Be the first to know when we launch. Sign up for updates!
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                         transition-colors duration-200 disabled:opacity-50
                         disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Notify me'}
              </button>
            </div>

            {submitStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-center">
                Thanks for signing up! We'll keep you posted.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-center">
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}