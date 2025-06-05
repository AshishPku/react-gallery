"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import AuthForm from "./components/AuthForm";
import Gallery from "./components/Gallery";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      // Trigger fade-in animation after loading
      setTimeout(() => setFadeIn(true), 100);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Loading content */}
        <div className="relative z-10 text-center">
          {/* Animated logo/spinner */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              {/* Spinning ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 border-r-pink-400 rounded-full animate-spin"></div>
              {/* Inner pulsing dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
            </div>

            {/* Loading text with typewriter effect */}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Photo Gallery
              </h2>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-gray-300 text-lg">Loading</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-64 mx-auto">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-pulse shadow-lg shadow-purple-500/30"></div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + (i % 2)}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* CSS for custom animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 1;
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-1000">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div
        className={`transition-all duration-1000 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Header user={user} />
      </div>

      {/* Main content with smooth transitions */}
      <main
        className={`relative z-10 transition-all duration-1000 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {user ? (
          <div className="animate-slideInRight">
            <Gallery />
          </div>
        ) : (
          <div className="animate-slideInLeft">
            <AuthForm />
          </div>
        )}
      </main>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        /* Smooth page transitions */
        * {
          transition-property: background-color, border-color, color, fill,
            stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }

        /* Selection styling */
        ::selection {
          background: rgba(139, 92, 246, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}

export default App;
