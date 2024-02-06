import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const TEST_VALID_CREDENTIALS = {
  email: 'test_user@gmail.com',
  password: 'test_password'
}

export const TEST_INVALID_CREDENTIALS = {
  email: 'test_u@gmail.com',
  password: '12345678'
}

export const server = setupServer(...handlers)
