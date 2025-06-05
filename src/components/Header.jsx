"use client";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { LogOut, User, Camera } from "lucide-react";

const Header = ({ user }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 border-b border-white/10 shadow-2xl shadow-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 transform hover:rotate-12 transition-all duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
                Cheetah Group
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Capture your moments
              </p>
            </div>
          </div>

          {/* User Section */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* Welcome Message - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">Welcome back</p>
                  <p className="text-xs text-gray-400 max-w-32 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Mobile User Indicator */}
              <div className="md:hidden w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25">
                <User className="w-5 h-5 text-white" />
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500 hover:to-pink-500 border border-red-500/30 hover:border-red-400 text-red-300 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                <div className="flex items-center space-x-2">
                  <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="hidden sm:inline font-medium">Sign Out</span>
                </div>

                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Decorative bottom border with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      {/* Floating particles effect (optional) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-8 right-1/3 w-1 h-1 bg-pink-400/40 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-12 left-3/4 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
