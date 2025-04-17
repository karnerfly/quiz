import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      if (value.length > 0 && !validatePassword(value)) {
        setErrors(prev => ({
          ...prev,
          password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          password: ''
        }));
      }
    }

    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      if (name === 'password' ? value !== formData.confirmPassword : value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePassword(formData.password)) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }));
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }

    // Simulate successful signup
    toast.success('Account created successfully! Redirecting...', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#10B981',
        color: '#FFFFFF',
        fontWeight: '500',
        borderRadius: '9999px',
        padding: '16px 24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }
    });

    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <>
      {/* Toast Notification */}
      <Toaster />
      
      <section className="w-full py-20 px-6 md:px-24 bg-[#f9f9f9] min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Sign Up
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join our community to engage with your audience
            </p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Register Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Mobile Number Field */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-transparent`}
                  placeholder="••••••••"
                  required
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-transparent`}
                  placeholder="••••••••"
                  required
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-full text-base font-semibold shadow hover:scale-[1.02] transition-transform"
              >
                Create Account
              </button>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/auth/login" className="font-medium text-black hover:underline">
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

export default RegisterPage;