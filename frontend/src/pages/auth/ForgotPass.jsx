import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate API call
    toast.success('Password reset link sent to your email!', {
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

    setIsSubmitted(true);
    setError('');
  };

  return (
    <>
      <Toaster />
      
      <section className="w-full py-20 px-6 md:px-24 bg-[#f9f9f9] min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Reset Your Password
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Enter your email to receive a password reset link
            </p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm">
            {isSubmitted ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Check Your Email
                </h3>
                <p className="text-gray-600">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <a
                  href="/login"
                  className="inline-block bg-black text-white px-6 py-3 rounded-full text-base font-semibold shadow hover:scale-[1.02] transition-transform mt-6"
                >
                  Back to Login
                </a>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-transparent`}
                    placeholder="your@email.com"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white px-6 py-3 rounded-full text-base font-semibold shadow hover:scale-[1.02] transition-transform"
                >
                  Send Reset Link
                </button>

                <div className="text-center text-sm text-gray-600">
                  Remember your password?{' '}
                  <a href="/login" className="font-medium text-black hover:underline">
                    Sign in
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;