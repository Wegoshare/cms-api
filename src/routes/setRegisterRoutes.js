
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiRegister } = require('../services/api/ApiRegister')

const setRegisterRoutes = app => {
  app.options('/register')

  app.post('/register', async (req, res) => {
    await apiRegister.register(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.options('/email-confirm')

  app.post('/email-confirm', async (req, res) => {
    await apiRegister.emailConfirm(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })
}

module.exports = { setRegisterRoutes }
