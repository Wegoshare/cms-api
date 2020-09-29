const cors = require('cors')
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiLogin } = require('../services/api/ApiLogin')
const { allowMe } = require('../helpers/corsSettings')

const setLoginRoutes = app => {
  app.options('/login', cors(allowMe))

  app.post('/login', cors(allowMe), async (req, res) => {
    const ans = await apiLogin.login(req.body)
    res
      .status(OK)
      // .set('Set-Cookie', `authToken=${token}; Secure; HttpOnly`)
      .set('Set-Cookie', `authToken=${ans.token}; HttpOnly`)
      .send(ans.user)
  })
}

module.exports = { setLoginRoutes }
