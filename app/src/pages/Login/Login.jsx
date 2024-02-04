import Card from '@/components/Card'
import React from 'react'
import { Link } from 'react-router-dom'
import { BiHelpCircle } from 'react-icons/bi'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Logo from '@/components/Logo'
import AuthLayout from '@/components/AuthLayout'
import { useLogin } from './hooks/useLogin'

const Login = () => {
  const { goToSignup, handleSubmit, isLoading, register } = useLogin()

  return (
    <AuthLayout>
      <Logo />
      <Card>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-11/12 mx-auto py-5"
        >
          <Input {...register('email')} placeholder="Email" />
          <Input
            {...register('password')}
            placeholder="Password"
            type="password"
          />

          <Button disabled={isLoading} className="mt-5" type="submit">
            {isLoading ? 'Wait please...' : 'Log in'}
          </Button>

          <hr className="bg-slate-900 h-[1px]" />
          <small className="text-slate-600 text-center">
            You don't have an account?
          </small>
          <Button onClick={goToSignup} type="button">
            Create account
          </Button>
        </form>
      </Card>
      <div className="flex justify-center mt-3">
        <Link
          to={'/recover'}
          className="hover:text-gray-300 text-white hover:underline flex items-center gap-1"
        >
          <BiHelpCircle /> Recover my account
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Login
