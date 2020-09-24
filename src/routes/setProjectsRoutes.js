const cors = require('cors')
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiProjects } = require('../services/api/ApiProjects')
const { checkAuth } = require('../services/auth/checkAuth')
const { checkProjectAccess } = require('../services/auth/checkProjectAccess')
const { allowAll } = require('../helpers/corsSettings')

const setProjectsRoutes = app => {
  app.options('/projects', cors(allowAll))

  app.get('/projects', cors(allowAll), checkAuth, async (req, res) => {
    const { userId } = req
    const projects = await apiProjects.getProjects(userId)
    res.status(OK).send(projects)
  })

  app.post('/projects', cors(allowAll), checkAuth, async (req, res) => {
    const { userId } = req
    await apiProjects.postProject(userId, req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.options('/projects/:projectId', cors(allowAll))

  app.put('/projects/:projectId', cors(allowAll), checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    await apiProjects.putProject(projectId, req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.delete('/projects/:projectId', cors(allowAll), checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    await apiProjects.deleteProject(projectId)
    res.status(OK).send(getStatusMessage(OK))
  })
}

module.exports = { setProjectsRoutes }
