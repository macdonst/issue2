// View documentation at: https://docs.begin.com
import { deleteUser } from '../../../models/users.mjs'
import canI from '../../../models/auth/can-i.mjs'

/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const admin = canI(req, 'admin')
  if (!admin) {
    return {
      statusCode: 401
    }
  }

  
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, user: removed, ...newSession } = session
  try {
    await deleteUser(id)
    return {
      session: newSession,
      json: null,
      location: '/users'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/users'
    }
  }
}
