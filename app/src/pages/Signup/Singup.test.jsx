import {
  expect,
  describe,
  it,
  afterAll,
  afterEach,
  beforeAll,
  vi
} from 'vitest'

import Signup from './Signup.jsx'
import { render, renderHook, screen, waitFor } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { TestProviderWrapper } from '@/mocks/test_utils.jsx'
import toast, { useToaster } from 'react-hot-toast'

import {
  TEST_INVALID_CREDENTIALS,
  TEST_VALID_CREDENTIALS
} from '@/mocks/server.js'

describe('Signup test suite', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    })
  })

  it('Should mount the component', () => {
    const container = render(
      <TestProviderWrapper>
        <Signup />
      </TestProviderWrapper>
    )

    expect(container).toBeDefined()
    expect(screen.getByText('Sign up')).toBeDefined()
  })

  it('Should show validation feeback on empty inputs', () => {
    render(
      <TestProviderWrapper>
        <Signup />
      </TestProviderWrapper>
    )

    expect(screen.getByText('All fields are required')).toBeDefined()

    expect(screen.getByText('Sign up')).toHaveProperty('disabled')
  })

  it('Should stop validation feedback on all inputs filled', async () => {
    render(
      <TestProviderWrapper>
        <Signup />
      </TestProviderWrapper>
    )

    expect(screen.getByText('Loading departments...')).toBeDefined()

    const user = userEvent.setup()

    const nameInput = screen.getByPlaceholderText('Name')
    await user.type(nameInput, 'Name Test Signup')

    const lastNameInput = screen.getByPlaceholderText('Lastname')
    await user.type(lastNameInput, 'Lastname Test Signup')

    const emailInput = screen.getByPlaceholderText('Email')
    await user.type(emailInput, 'Email Test Signup')

    const passwordInput = screen.getByPlaceholderText('Password')
    await user.type(passwordInput, 'Password Test Signup')

    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password')
    await user.type(confirmPasswordInput, 'Confirm password Test Signup')

    const selectDepartmentInput = await screen.findByRole('combobox')

    await user.selectOptions(selectDepartmentInput, '1')

    expect(screen.queryByText('All fields are required')).toBeNull()

    expect(screen.queryByText('The email is not valid')).toBeTruthy()

    await user.clear(emailInput)
    await user.type(emailInput, 'test_user@gmail.com')

    const formAlertTextContent = screen.getByRole('alert').textContent

    screen.debug()

    expect(formAlertTextContent).toContain("The passwords don't match")

    await user.clear(passwordInput)
    await user.type(passwordInput, 'match_123456')

    await user.clear(confirmPasswordInput)
    await user.type(confirmPasswordInput, 'match_123456')

    expect(formAlertTextContent).toContain('')

    console.log(screen.getByText('Sign up'))

    expect(screen.getByText('Sign up')).toHaveProperty('disabled', false)
  })

  afterEach(() => {
    const { result } = renderHook(() => useToaster())

    result.current.toasts.forEach((t) => {
      toast.remove(t.id)
    })
  })
})
