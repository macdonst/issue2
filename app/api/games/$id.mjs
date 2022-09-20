// View documentation at: https://docs.begin.com
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getGame, upsertGame, validate } from '../../models/games.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, game, ...session } = req.session
    return {
      session,
      json: { problems, game }
    }
  }

  const id = req.pathParameters?.id
  const result = await getGame(id)
  return {
    json: { game: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, game } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, game },
      json: { problems, game },
      location: `/games/${game.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, game: removed, ...newSession } = session
  try {
    const result = await upsertGame({ key: id, ...game })
    return {
      session: newSession,
      json: { game: result },
      location: '/games'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/games'
    }
  }
}
