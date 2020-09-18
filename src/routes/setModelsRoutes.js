
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiModels } = require('../services/api/ApiModels')
const { checkAuth } = require('../services/auth/checkAuth')
const { checkProjectAccess } = require('../services/auth/checkProjectAccess')

const setModelsRoutes = app => {
  app.options('/projects/:projectId/models')

  app.get('/projects/:projectId/models', checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    const models = await apiModels.getModels(projectId)
    res.status(OK).send(models)
  })

  app.post('/projects/:projectId/models', checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    await apiModels.postModel(projectId, req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.options('/projects/:projectId/models/:modelId')

  app.put(
    '/projects/:projectId/models/:modelId',
    checkAuth,
    checkProjectAccess,
    async (req, res) => {
      const { projectId, modelId } = req.params
      await apiModels.putModel(projectId, modelId, req.body)
      res.status(OK).send(getStatusMessage(OK))
    }
  )

  app.delete(
    '/projects/:projectId/models/:modelId',
    checkAuth,
    checkProjectAccess,
    async (req, res) => {
      const { projectId, modelId } = req.params
      await apiModels.deleteModel(projectId, modelId)
      res.status(OK).send(getStatusMessage(OK))
    }
  )
}

module.exports = { setModelsRoutes }
