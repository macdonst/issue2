import data from '@begin/data'
import { validator } from '@begin/validator'
import { Game } from './schemas/game.mjs'

const deleteGame = async function (key) {
  return data.destroy({ table: 'games', key })
}

const upsertGame = async function (game) {
  return data.set({ table: 'games', ...game })
}

const getGame = async function (key) {
  return data.get({ table: 'games', key })
}

const getGames = async function () {
  return data.get({ table: 'games' })
}

const validate = {
  shared (req) {
    return validator(req, Game)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, game: data } : { game: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, game: data } : { game: data }
  }
}

export {
  deleteGame,
  getGame,
  getGames,
  upsertGame,
  validate
}
