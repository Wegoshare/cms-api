
const { OK } = require('http-status-codes')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiProjects } = require('../services/api/ApiProjects')
const { checkAuth } = require('../services/auth/checkAuth')
const { checkProjectAccess } = require('../services/auth/checkProjectAccess')

const setProjectsRoutes = app => {
  app.options('/projects')

  app.get('/projects', checkAuth, async (req, res) => {
    const { userId } = req
    const projects = await apiProjects.getProjects(userId)
    res.status(OK).send(projects)
  })

  app.post('/projects', checkAuth, async (req, res) => {
    const { userId } = req
    await apiProjects.postProject(userId, req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.options('/projects/:projectId')

  app.put('/projects/:projectId', checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    await apiProjects.putProject(projectId, req.body)
    res.status(OK).send(getStatusMessage(OK))
  })

  app.delete('/projects/:projectId', checkAuth, checkProjectAccess, async (req, res) => {
    const { projectId } = req.params
    await apiProjects.deleteProject(projectId)
    res.status(OK).send(getStatusMessage(OK))
  })
}

module.exports = { setProjectsRoutes }
