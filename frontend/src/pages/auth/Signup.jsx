import { createTeacher } from "@src/api";
import { useAuth } from "@src/context/Auth";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  useEffect(() => {
    // Check if all fields are filled and no errors
    const isValid =
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.mobile.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      validateEmail(formData.email) &&
      validateMobile(formData.mobile) &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword &&
      Object.values(errors).every((error) => error === "");

    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      if (value.trim() === "") {
        setErrors((prev) => ({
          ...prev,
          name: "Name is required",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          name: "",
        }));
      }
    }

    if (name === "email") {
      if (value.trim() === "") {
        setErrors((prev) => ({
          ...prev,
          email: "Email is required",
        }));
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }
    }

    if (name === "mobile") {
      if (value.trim() === "") {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile number is required",
        }));
      } else if (!validateMobile(value)) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Please enter a valid 10-digit mobile number",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          mobile: "",
        }));
      }
    }

    if (name === "password") {
      if (value.length > 0 && !validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password:
            "Password must be at least 8 characters long and contain at least one letter, one number, and one special character",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }

    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      if (
        name === "password"
          ? value !== formData.confirmPassword
          : value !== formData.password
      ) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    createTeacher({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.mobile,
    })
      .then((resp) => {
        const authToken = resp.data;
        setToken(authToken);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        const msg =
          error.status == 400 ? "invalid user details" : error.message;
        toast.error(msg);
      });
  };

  return (
    <>
      <Toaster />

      <section className="w-full py-20 px-6 md:px-24 bg-[#f9f9f9] min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-16">
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Sign Up
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join our community to engage with your audience
            </p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-black focus:border-transparent`}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

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
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-black focus:border-transparent`}
                  placeholder="1234567890"
                  required
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
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
                  required
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-black focus:border-transparent`}
                  placeholder="••••••••"
                  required
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full px-6 py-3 rounded-full text-base font-semibold shadow transition-transform ${
                  isFormValid
                    ? "bg-black text-white hover:scale-[1.02] cursor-pointer"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                Create Account
              </button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="font-medium text-black hover:underline"
                >
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
