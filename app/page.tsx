"use client";

import Link from "next/link";
import { MotionButton } from "@/components/ui/motionButton";
import {
  MessageCircle,
  Sparkles,
  Settings,
  Users,
  Zap,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#181818] dark:via-[#212121] dark:to-[#181818]">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <MessageCircle className="h-8 w-8 text-gray-600 dark:text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ChatAI
          </h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <Link href="/settings">
            <MotionButton variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </MotionButton>
          </Link>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Your AI-Powered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200">
                Chat Companion
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience intelligent conversations with advanced AI. Customize
              personalities, manage multiple sessions, and enjoy a premium chat
              experience built for modern users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/chat">
              <MotionButton size="lg" className="text-lg px-8 py-3">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chatting
              </MotionButton>
            </Link>
            <Link href="/settings">
              <MotionButton
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3"
              >
                <Settings className="h-5 w-5 mr-2" />
                Configure Settings
              </MotionButton>
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose ChatAI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-center p-6 rounded-lg bg-white/50 dark:bg-[#212121]/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#303030] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real-time Streaming
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Watch AI responses appear in real-time with smooth
                token-by-token streaming for a natural conversation flow.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-center p-6 rounded-lg bg-white/50 dark:bg-[#212121]/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#303030] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Custom Personalities
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create unique AI personalities for different use cases - from
                helpful assistant to creative companion.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-center p-6 rounded-lg bg-white/50 dark:bg-[#212121]/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#303030] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your API key stays in your browser. All conversations are stored
                locally with full control over your data.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-center p-6 rounded-lg bg-white/50 dark:bg-[#212121]/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#303030] rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Session Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Organize multiple conversations with easy session management,
                renaming, and deletion capabilities.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-center p-6 rounded-lg bg-white/50 dark:bg-[#212121]/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#303030] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with Next.js 14 and optimized for performance with smooth
                animations and responsive design.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-center p-6 rounded-lg bg-white/50 dark:bg-[#212121]/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#303030] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fully Customizable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dark/light themes, custom avatars, and personalized settings to
                make the experience truly yours.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-[#303030] dark:to-[#212121] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of users experiencing the future of AI conversation
            </p>
            <Link href="/chat">
              <MotionButton
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Launch ChatAI Now
              </MotionButton>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
          <p>
            &copy; 2024 ChatAI. Built with Next.js, OpenAI, and modern web
            technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}
