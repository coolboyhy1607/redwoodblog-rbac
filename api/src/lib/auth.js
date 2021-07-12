import { AuthenticationError, ForbiddenError, parseJWT } from '@redwoodjs/api'
import { logger } from 'src/lib/logger'
/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const getCurrentUser = async (decoded) => {
  logger.trace('In getCurrentUser')

  const user = context.currentUser || {
    ...decoded,
    roles: parseJWT({ decoded }).roles,
  }

  logger.debug({ user }, 'Current user info')

  return user
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = () => {
  return !!context.currentUser
}

/**
 * Checks if the currentUser is authenticated (and assigned one of the given roles)
 *
 * @param {string= | string[]=} role - A single role or list of roles to check if the user belongs to
 *
 * @returns {boolean} - Returns true if the currentUser is authenticated (and assigned one of the given roles)
 */
export const hasRole = ({ role }) => {
  if (!isAuthenticated()) {
    return false
  }

  if (
    typeof role !== 'undefined' &&
    typeof role === 'string' &&
    context.currentUser.roles?.includes(role)
  ) {
    return true
  }

  if (
    typeof role !== 'undefined' &&
    Array.isArray(role) &&
    context.currentUser.roles?.some((r) => role.includes(r))
  ) {
    return true
  }

  return false
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string= | string[]=} role - A single role or list of roles to check if the user belongs to
 *
 * @returns - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = ({ role } = {}) => {
  if (!isAuthenticated) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (!hasRole({ role })) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
