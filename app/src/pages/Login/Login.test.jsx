import {
  expect,
  describe,
  it,
  afterAll,
  afterEach,
  beforeAll,
  vi
} from 'vitest'

import Login from './Login.jsx'
import {
  render,
  renderHook,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { TestProviderWrapper } from '@/mocks/test_utils.jsx'
import {
  TEST_INVALID_CREDENTIALS,
  TEST_VALID_CREDENTIALS
} from '@/mocks/server.js'
import toast, { useToaster } from 'react-hot-toast'

describe('Login test suite', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    })
  })
  it('Should mount the component', () => {
    const container = render(
      <TestProviderWrapper>
        <Login />
      </TestProviderWrapper>
    )

    expect(container).toBeDefined()
    expect(screen.getByText('Log in')).toBeDefined()
  })

  it('Should complete log in flow', async () => {
    render(
      <TestProviderWrapper>
        <Login />
      </TestProviderWrapper>
    )
    const user = userEvent.setup()

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    await user.type(emailInput, TEST_VALID_CREDENTIALS.email)
    await user.type(passwordInput, TEST_VALID_CREDENTIALS.password)

    const loginButton = screen.getByRole('button', {
      name: /log in/i
    })

    await user.click(loginButton)

    expect(await screen.findByText('Wait please...')).toBeDefined()

    expect(await screen.findByText('Loading...')).toBeDefined()

    // screen.debug()

    expect(await screen.findByText('Welcome')).toBeDefined()

    // setTimeout(() => {
    //   expect(screen.getByText('Welcomo')).toBeDefined()
    // }, 2000)
  })

  it('Should not complete log in flow by invalid email', async () => {
    render(
      <TestProviderWrapper>
        <Login />
      </TestProviderWrapper>
    )
    const user = userEvent.setup()

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    await user.type(emailInput, 'Hello.com')
    await user.type(passwordInput, TEST_INVALID_CREDENTIALS.password)

    const loginButton = screen.getByRole('button', {
      name: /log in/i
    })

    await user.click(loginButton)

    expect(await screen.findByText('Wait please...')).toBeDefined()

    expect(
      await screen.findByText('The provided email is not valid.')
    ).toBeDefined()
  })

  it('Should not complete log in flow by invalid credentials', async () => {
    render(
      <TestProviderWrapper>
        <Login />
      </TestProviderWrapper>
    )
    const user = userEvent.setup()

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    await user.type(emailInput, 'safsfsdf@gmail.com')
    await user.type(passwordInput, TEST_INVALID_CREDENTIALS.password)

    const loginButton = screen.getByRole('button', {
      name: /log in/i
    })

    await user.click(loginButton)

    expect(await screen.findByText('Wait please...')).toBeDefined()

    expect(
      await screen.findByText('Wrong credentials, check it out.')
    ).toBeDefined()
  })

  afterEach(() => {
    const ref = renderHook(() => useToaster())

    ref.result.current.toasts.forEach((t) => {
      toast.remove(t.id)
    })
  })

  afterAll(() => {
    window.localStorage.clear()
  })
})
