import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Register() {
  const { createUser, signInWithGoogle, signInWithFacebook } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSuccess("");
    try {
      await createUser(data.email, data.password);
      setSuccess("Account created successfully!");
      reset();
      // Redirect after a short delay to show success message
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setError("root", {
        type: "manual",
        message: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setSuccess("");
    
    provider()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("root", {
          type: "manual",
          message: error.message || "Social login failed. Please try again.",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-5 px-6">
          <h2 className="text-2xl font-bold text-white text-center">Create Your Account</h2>
          <p className="text-center text-blue-100 mt-1">Join us to get started</p>
        </div>
        
        <div className="p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <AiOutlineCheckCircle className="text-green-500 mr-2" size={20} />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <input
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all pr-10 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-gray-700 mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all pr-10 ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-11 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

            {/* Root Error */}
            {errors.root && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errors.root.message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-3 text-gray-400 text-sm">or sign up with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex gap-4">
            <button 
              onClick={() => handleSocialLogin(signInWithGoogle)}
              disabled={isLoading}
              className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <FcGoogle size={18} />
              <span>Google</span>
            </button>
            <button 
              onClick={() => handleSocialLogin(signInWithFacebook)}
              disabled={isLoading}
              className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <FaFacebook size={18} className="text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}