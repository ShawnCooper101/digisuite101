'use client'

import { DigiBot101Widget } from '@/components/DigiBot101Widget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to DigiSuite101
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your AI-powered digital marketing platform with DigiBot101 voice assistant
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              DigiBot101 Assistant
            </h2>
            <p className="text-gray-600 mb-6">
              Meet Ava Skye and Matt, your AI voice assistants ready to help with digital marketing, 
              automation, and business growth. Click the floating widget in the bottom-right corner to get started!
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">Ava Skye</h3>
                <p className="text-purple-600">Professional voice assistant with a warm, engaging personality perfect for business communications.</p>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Matt</h3>
                <p className="text-blue-600">Confident and warm voice assistant ideal for presentations and client interactions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* DigiBot101 Floating Widget */}
      <DigiBot101Widget />
    </main>
  )
}