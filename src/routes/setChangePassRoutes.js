const cors = require('cors')
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiChangePass } = require('../services/api/ApiChangePass')
const { allowAll } = require('../helpers/corsSettings')

const setChangePassRoutes = app => {
  app.options('/recover', cors(allowAll))

  app.post('/recover', cors(allowAll), async (req, res) => {
    await apiChangePass.recover(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.options('/change-pass', cors(allowAll))

  app.post('/change-pass', cors(allowAll), async (req, res) => {
    await apiChangePass.changePass(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })
}

module.exports = { setChangePassRoutes }
