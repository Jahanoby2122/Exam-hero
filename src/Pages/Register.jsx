import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function Register() {
  const { createUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

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
    setSuccess(""); // আগের success মেসেজ clear হবে
    try {
      // ✅ Firebase এ ইউজার রেজিস্ট্রেশন
      await createUser(data.email, data.password);

      // ✅ Success হলে মেসেজ দেখাবে
      setSuccess("Account created successfully!");
      reset(); // form clear
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-xl overflow-hidden">
        <div className="card-body p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
            Create an Account
          </h2>

          {/* ✅ Success Message */}
          {success && (
            <p className="text-green-600 text-center font-medium mb-3">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered w-full"
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
                className="checkbox checkbox-primary"
              />
              <span className="text-sm">I agree to the Terms & Conditions</span>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

            {/* Root Error */}
            {errors.root && (
              <p className="text-red-500 text-center">{errors.root.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
