const cors = require('cors')
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiRegister } = require('../services/api/ApiRegister')
const { allowAll } = require('../helpers/corsSettings')

const setRegisterRoutes = app => {
  app.options('/register', cors(allowAll))

  app.post('/register', cors(allowAll), async (req, res) => {
    await apiRegister.register(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.options('/email-confirm', cors(allowAll))

  app.post('/email-confirm', cors(allowAll), async (req, res) => {
    await apiRegister.emailConfirm(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })
}

module.exports = { setRegisterRoutes }
