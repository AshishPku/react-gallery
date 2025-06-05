"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Camera,
  ArrowRight,
} from "lucide-react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message.replace("Firebase: ", "").replace("Error ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error.message.replace("Firebase: ", "").replace("Error ", ""));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsAnimating(true);
    setError("");
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 150);
  };

  const GoogleIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Auth container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Hero section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl shadow-2xl shadow-purple-500/25 mb-6 animate-bounce-slow">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Photo Gallery
          </h1>
          <p className="text-gray-400 text-lg">
            Capture and share your moments
          </p>
        </div>

        {/* Auth form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header */}
            <div
              className={`text-center mb-8 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                {isLogin ? "Welcome Back" : "Join Us"}
              </h2>
              <p className="text-gray-300">
                {isLogin
                  ? "Sign in to access your gallery"
                  : "Create your account to get started"}
              </p>
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-6 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <GoogleIcon />
              )}
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 px-4">
                <span className="text-gray-400 text-sm font-medium">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl text-red-300 text-sm animate-shake">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    {error}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="text-center mt-8">
              <p className="text-gray-400">
                {isLogin ? "New to Photo Gallery?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
                >
                  {isLogin ? "Create an account" : "Sign in instead"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AuthForm;
