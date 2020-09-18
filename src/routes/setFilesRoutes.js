
const { OK } = require('http-status-codes')
const { apiFiles } = require('../services/api/ApiFiles')
const { checkAuth } = require('../services/auth/checkAuth')
const { checkProjectAccess } = require('../services/auth/checkProjectAccess')
const { ApiError } = require('../helpers/ApiError')
const { FORBIDDEN } = require('http-status-codes')
const { config } = require('../config')

const setFilesRoutes = app => {
  app.options('/projects/:projectId/files')

  app.post('/projects/:projectId/files', checkAuth, checkProjectAccess, async (req, res) => {
    if (!config.uploadFiles) {
      throw new ApiError(
        'Files uploading are not allowed ' +
          'to reduce memory usage of demo server. Use on-premises ' +
          'version, check https://github.com/evmizulin/any-json-cms',
        FORBIDDEN
      )
    }
    const { projectId } = req.params
    const file = await apiFiles.postFile(projectId, req.files && req.files.file ? req.files.file : null)
    res.status(OK).send(file)
  })

  app.options('/projects/:projectId/files/:fileId/:fileName')

  app.get(
    '/projects/:projectId/files/:fileId/:fileName',
    checkAuth,
    checkProjectAccess,
    async (req, res) => {
      const { projectId, fileId, fileName } = req.params
      const file = await apiFiles.getFile(projectId, fileId, fileName)
      res
        .status(OK)
        .set('Content-Type', file.mimetype)
        .send(file.buffer)
    }
  )
}

module.exports = { setFilesRoutes }
