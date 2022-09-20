// View documentation at: https://docs.begin.com
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getUser, upsertUser, validate } from '../../models/users.mjs'
import canI from '../../models/auth/can-i.mjs'

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

  
  if (req.session.problems) {
    let { problems, user, ...session } = req.session
    return {
      session,
      json: { problems, user }
    }
  }

  const id = req.pathParameters?.id
  const result = await getUser(id)
  return {
    json: { user: result }
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

  
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, user } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, user },
      json: { problems, user },
      location: `/users/${user.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, user: removed, ...newSession } = session
  try {
    const result = await upsertUser({ key: id, ...user })
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
