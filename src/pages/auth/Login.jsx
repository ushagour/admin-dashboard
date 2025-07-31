"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { useAuth } from '../../hooks/useAuth';


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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4 p-md-5">
                {/* Logo and Title */}
                <div className="text-center mb-4">
                  <div
                    className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   
                  >
                  <img  style={{ width: "60px", height: "60px" }} src="./JIBOBI3_LOGO.png" alt="LOGO"/>
                  </div>
                  <p className="text-muted">{isLogin ? "Sign in to your dashboard" : "Create your seller account"}</p>
                </div>

                {/* Login/Register Toggle */}
                <div className="d-flex mb-4">
                  <button
                    className={`btn flex-fill me-2 ${isLogin ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </button>
                  <button
                    className={`btn flex-fill ${!isLogin ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {/* Register Fields */}
                  {!isLogin && (
                    <div className="row mb-3">
                      <div className="col-6">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
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

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="position-relative">
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
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 10 }}
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password for Register */}
                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
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
                  )}

                  {/* Remember Me / Forgot Password */}
                  {isLogin && (
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
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
                      <a href="#" className="text-decoration-none">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  {/* Terms for Register */}
                  {!isLogin && (
                    <div className="mb-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the{" "}
                          <a href="#" className="text-decoration-none">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-decoration-none">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                    {isLogin ? "Sign In" : "Create Account"}
                  </button>
                </form>

                {/* Divider */}
                <div className="text-center mb-3">
                  <span className="text-muted">or continue with</span>
                </div>

                {/* Social Login */}
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-secondary">
                    <span className="me-2">🔍</span>
                    Continue with Google
                  </button>
                  <button className="btn btn-outline-secondary">
                    <span className="me-2">📘</span>
                    Continue with Facebook
                  </button>
                </div>

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "Sign up here" : "Sign in here"}
                    </button>
                  </small>
                </div>
              </div>
            </div>

            {/* Demo Credentials */}
            {/* <div className="card mt-3 bg-light border-0">
              <div className="card-body p-3">
                <h6 className="card-title mb-2">Demo Credentials</h6>
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted d-block">Email:</small>
                    <small className="fw-bold">demo@sellerpro.com</small>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Password:</small>
                    <small className="fw-bold">demo123</small>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
