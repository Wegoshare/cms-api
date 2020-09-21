const cors = require('cors')
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiLogin } = require('../services/api/ApiLogin')
const { allowAll } = require('../helpers/corsSettings')

const setLoginRoutes = app => {
  app.options('/login', cors(allowAll))

  app.post('/login', cors(allowAll), async (req, res) => {
    const token = await apiLogin.login(req.body)
    res
      .status(OK)
      // .set('Set-Cookie', `authToken=${token}; Secure; HttpOnly`)
      .set('Set-Cookie', `authToken=${token}; HttpOnly`)
      .send(getStatusMessage(OK))
  })
}

module.exports = { setLoginRoutes }
