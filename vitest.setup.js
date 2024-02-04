import { server } from './app/src/mocks/server'

import fetch from 'cross-fetch'

console.log('Configuring server')

// // Need to add this line
global.fetch = fetch

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})
