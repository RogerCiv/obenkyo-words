"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login(email, password)
      navigate("/")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error inesperado"
      setError(errorMessage)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">Iniciar Sesión</h2>
            <p className="text-base-content/70 mt-2">Accede a tu cuenta para continuar</p>
          </div>

          {error && (
            <div className="alert alert-error mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
                <Link to="/forgot-password" className="label-text-alt link link-hover text-primary">
                  ¿Olvidaste tu contraseña?
                </Link>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`} disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>

          <div className="divider my-6">O</div>

          <div className="text-center">
            <p className="text-base-content/70">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="link link-primary font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

