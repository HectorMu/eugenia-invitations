import { AuthHandlers } from './auth.handlers'
import { DepartmentsHandlers } from './deparments.handlers'

export const handlers = [...AuthHandlers, ...DepartmentsHandlers]
