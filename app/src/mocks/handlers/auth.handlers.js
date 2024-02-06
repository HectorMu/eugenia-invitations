import { http } from 'msw'
import { http, HttpResponse, delay } from 'msw'
import { EXISTING_TEST_EMAIL, TEST_VALID_CREDENTIALS } from '../server'

export const AuthHandlers = [
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
  }),

  http.post('http://localhost:4000/api/signup', async ({ request }) => {
    await delay(500)

    const credentials = await request.json()

    if (credentials.email === EXISTING_TEST_EMAIL) {
      return new HttpResponse(
        JSON.stringify({
          message: 'An account is using this email already, try another email.'
        }),
        {
          status: 400,
          statusText:
            'An account is using this email already, try another email.'
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
]
