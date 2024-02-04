import { setupServer } from 'msw/node'
import { http, HttpResponse, delay } from 'msw'

export const TEST_VALID_CREDENTIALS = {
  email: 'test_user@gmail.com',
  password: 'test_password'
}

export const TEST_INVALID_CREDENTIALS = {
  email: 'test_u@gmail.com',
  password: '12345678'
}

export const server = setupServer(
  http.post('http://localhost:4000/api/login', async ({ request }) => {
    await delay(500)

    const credentials = await request.json()

    if (!credentials.email.includes('@')) {
      return new HttpResponse(
        JSON.stringify({
          message: 'The provided email is not valid.'
        }),
        {
          status: 400,
          statusText: 'The provided email is not valid.'
        }
      )
    }

    if (credentials.email !== TEST_VALID_CREDENTIALS.email) {
      return new HttpResponse(
        JSON.stringify({
          message: 'Wrong credentials, check it out.'
        }),
        {
          status: 400,
          statusText: 'Wrong credentials, check it out.'
        }
      )
    }

    if (credentials.password !== TEST_VALID_CREDENTIALS.password) {
      return new HttpResponse(
        JSON.stringify({
          message: 'Wrong credentials, check it out.'
        }),
        {
          status: 400,
          statusText: 'Wrong credentials, check it out.'
        }
      )
    }

    return HttpResponse.json({
      id: 'user_id_test',
      name: 'Test',
      lastname: 'user',
      email: TEST_VALID_CREDENTIALS.email
    })
  })
)
