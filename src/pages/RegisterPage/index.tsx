
import React, { } from 'react'

import { Layout, RegisterArea } from './styles'
import { Input, Button, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'

import api from '../../services/api'
import schema from './validation'

const RegisterPage: React.FC = () => {
  interface IFormInput {
    email: string,
    password: string,
    passConf: string
  }

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    console.log(data)
    api.post('/register', data)
  }

  return (
    <Layout>
      <RegisterArea>
      <Box>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Input type='email' {...register('email')} placeholder='Seu email: ' size='md' name='email'/>
          <p>{errors.email?.message}</p>

          <Input type='password' {...register('password')} placeholder='Sua senha: ' size='md' name='password'/>
          <p>{errors.password?.message}</p>

          <Input type='password' placeholder='Sua senha novamente: ' size='md' name='passConf'/>
          <p>{errors.passConf?.message}</p>

          <Button type='submit' isLoading={isSubmitting}>Cadastrar</Button>
          <Link to='/login'>Já possui uma conta?</Link>
        </form>
      </Box>
      </RegisterArea>
    </Layout>
  )
}

export default RegisterPage
