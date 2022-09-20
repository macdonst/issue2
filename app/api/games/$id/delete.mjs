// View documentation at: https://docs.begin.com
import { deleteGame } from '../../../models/games.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, game: removed, ...newSession } = session
  try {
    await deleteGame(id)
    return {
      session: newSession,
      json: null,
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
