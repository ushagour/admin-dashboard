"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { useAuth } from '../../hooks/useAuth';
import '../../styles/auth/login.css'; // We'll create this CSS file

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const { login: LoginAPI, register: RegisterAPI } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      if (isLogin) {
        LoginAPI(formData.email, formData.password)
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          return
        }
        const data = await RegisterAPI({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
        // Optionally auto-login or show success message
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Authentication failed')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left-section">
          <div className="logo">
            <img src="./JIBOBI3_LOGO.png" alt="JIBOBI Logo" />
            <span>JIB O BI3</span>
          </div>
          <div className="welcome-text">
            <p>Sign in to your dashboard to manage your store, track orders, and analyze sales performance.</p>
          </div>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="feature-text">
                <h3>Sales Analytics</h3>
                <p>Track your store performance with detailed analytics</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-box-open"></i>
              </div>
              <div className="feature-text">
                <h3>Order Management</h3>
                <p>Easily process and fulfill customer orders</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="feature-text">
                <h3>Customer Insights</h3>
                <p>Understand your customers and their preferences</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="login-right-section">
          <div className="form-header">
            <button 
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          
          <div className="form-container">
            <h2 className="form-title">{isLogin ? "Sign in to your dashboard" : "Create your seller account"}</h2>
            
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              
              {!isLogin && (
                <div className="row mb-3">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <div className="input-with-icon">
                        <i className="fas fa-user"></i>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required={!isLogin}
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <div className="input-with-icon">
                        <i className="fas fa-user"></i>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required={!isLogin}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 
                      <i className="fas fa-eye-slash"></i> : 
                      <i className="fas fa-eye"></i>
                    }
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="options">
                  <div className="remember">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
              )}

              {!isLogin && (
                <div className="terms mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the{" "}
                      <a href="#" className="text-link">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-link">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
              )}

              <button type="submit" className="login-btn">
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button className="social-btn google-btn">
                <i className="fab fa-google"></i>
                Continue with Google
              </button>
              <button className="social-btn facebook-btn">
                <i className="fab fa-facebook-f"></i>
                Continue with Facebook
              </button>
            </div>

            <div className="auth-switch">
              <span>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up here" : "Sign in here"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}