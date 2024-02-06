import { http } from 'msw'
import { http, HttpResponse, delay } from 'msw'

export const DepartmentsHandlers = [
  http.get('http://localhost:4000/api/departments', async ({ request }) => {
    await delay(500)

    return HttpResponse.json([{ id: '1', NAME: 'Sales' }])
  })
]
