import { useState } from "react"
import supabase from "../utils/supabase-client"


export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      console.log(error)
      return
    }

    if (data) {
      console.log(data)
      alert('Usuario registrado correctamente')
    }
    console.log(email, password)
  }

  return (
    <div className="">
      <h1>Register Page</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}
