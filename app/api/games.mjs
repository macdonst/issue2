// View documentation at: https://docs.begin.com
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getGames, upsertGame, validate } from '../models/games.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const games = await getGames()
  if (req.session.problems) {
    let { problems, game, ...session } = req.session
    return {
      session,
      json: { problems, games, game }
    }
  }

  return {
    json: { games }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, game } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, game },
      json: { problems, game },
      location: '/games'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, game: removed, ...newSession } = session
  try {
    const result = await upsertGame(game)
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
