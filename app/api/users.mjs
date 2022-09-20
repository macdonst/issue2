// View documentation at: https://docs.begin.com
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getUsers, upsertUser, validate } from '../models/users.mjs'
import canI from '../models/auth/can-i.mjs'

/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const admin = canI(req, 'admin')
  if (!admin) {
    return {
      location: '/'
    }
  }

  
  const users = await getUsers()
  if (req.session.problems) {
    let { problems, user, ...session } = req.session
    return {
      session,
      json: { problems, users, user }
    }
  }

  return {
    json: { users }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const admin = canI(req, 'admin')
  if (!admin) {
    return {
      statusCode: 401
    }
  }

  
  const session = req.session
  // Validate
  let { problems, user } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, user },
      json: { problems, user },
      location: '/users'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, user: removed, ...newSession } = session
  try {
    const result = await upsertUser(user)
    return {
      session: newSession,
      json: { user: result },
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
