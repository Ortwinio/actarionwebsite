"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShieldCheckIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    localStorage.setItem('cookieConsent', JSON.stringify(necessaryOnly));
    setShowBanner(false);
  };

  const saveCustomPreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const updatePreference = (type: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-700 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {!showSettings ? (
            // Main banner view
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-white font-semibold">Cookie Preferences</h3>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                  By continuing to use our site, you consent to our use of cookies.{' '}
                  <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                    Learn more in our Privacy Policy
                  </a>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  Customize
                </button>
              </div>
            </div>
          ) : (
            // Settings view
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Cog6ToothIcon className="h-5 w-5 text-cyan-400" />
                  Cookie Settings
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Necessary Cookies</h4>
                    <p className="text-gray-400 text-sm">Required for the website to function properly</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="h-4 w-4 text-cyan-600 bg-neutral-700 border-neutral-600 rounded focus:ring-cyan-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Analytics Cookies</h4>
                    <p className="text-gray-400 text-sm">Help us understand how visitors interact with our website</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="h-4 w-4 text-cyan-600 bg-neutral-700 border-neutral-600 rounded focus:ring-cyan-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Marketing Cookies</h4>
                    <p className="text-gray-400 text-sm">Used to deliver personalized advertisements</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference('marketing', e.target.checked)}
                      className="h-4 w-4 text-cyan-600 bg-neutral-700 border-neutral-600 rounded focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={saveCustomPreferences}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 