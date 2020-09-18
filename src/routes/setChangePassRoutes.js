
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiChangePass } = require('../services/api/ApiChangePass')

const setChangePassRoutes = app => {
  app.options('/recover')

  app.post('/recover', async (req, res) => {
    await apiChangePass.recover(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.options('/change-pass')

  app.post('/change-pass', async (req, res) => {
    await apiChangePass.changePass(req.body)
    res.status(OK).send(getStatusMessage(OK))
  })
}

module.exports = { setChangePassRoutes }
