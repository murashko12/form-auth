import { useState, type ChangeEvent, type FormEvent } from "react"
import InputLogin from "../components/InputLogin"
import InputPassword from "../components/InputPassword"

import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../store/query/authApi"
import { toast } from "react-toastify"

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await login({ email, password }).unwrap()
      if (response) {
        toast.success('Успешный вход')
        navigate('/')
      }
    } catch {
      toast.error('Неверные учетные данные')
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="border border-[#4A516D] rounded-xl h-[450px] w-[400px] bg-[#131524] px-10">
        <h1 className="font-medium text-center text-[50px] my-10 text-[#F1F2FF]">ВХОД</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <InputLogin
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="логин"
            required
          />
          <InputPassword
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="пароль" 
            required
          />
          <Link className="underline text-[#F1F2FF]" to={"#"}>Забыли пароль?</Link>
          <button 
            className={`bg-linear-65 from-purple-500 to-pink-500 px-6 py-[10px] rounded-xl outline-none text-base cursor-pointer hover:scale-105 transition text-[#F1F2FF]`}
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
