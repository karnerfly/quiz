import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "@src/context/Auth";
import { useNavigate } from "react-router";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // simulate login
      const token = btoa(JSON.stringify(formData));
      console.log("token", token);
      localStorage.setItem("token", token);
      setToken(token);

      // Simulate successful login
      toast.success("Logged in successfully!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#FFFFFF",
          fontWeight: "500",
          borderRadius: "9999px",
          padding: "16px 24px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      });

      // should navigate to user dashboard
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <>
      <Toaster />

      <section className="w-full py-20 px-6 md:px-24 bg-[#f9f9f9] min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Welcome Back
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Sign in to access your account
            </p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Login Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-black focus:border-transparent`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="/auth/forgotpassword"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-black focus:border-transparent`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-full text-base font-semibold shadow hover:scale-[1.02] transition-transform"
              >
                Sign In
              </button>

              {/* Register Link */}
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/auth/signup"
                  className="font-medium text-black hover:underline"
                >
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
