
const { apiEntries } = require('../services/api/ApiEntries')
const { apiFiles } = require('../services/api/ApiFiles')
const { OK } = require('http-status-codes')
const { checkApiKey } = require('../services/auth/checkApiKey')
const { entryForPublic } = require('../helpers/entryForPublic')
const { checkFileRedirect } = require('../services/auth/checkFileRedirect')
const { getStatusMessage } = require('../helpers/getStatusMessage')
const { apiContacts } = require('../services/api/ApiContacts')

const setPublicRoutes = app => {
  app.options('/entries')

  app.get('/entries', checkApiKey, async (req, res) => {
    const { projectId } = req
    const { apiId } = req.query
    const entries = await apiEntries.getEntries(projectId, apiId)
    res.status(OK).send(entries.map(entry => entryForPublic(entry)))
  })

  app.options('/entries/:entryId')

  app.get('/entries/:entryId', checkApiKey, async (req, res) => {
    const { projectId } = req
    const { entryId } = req.params
    const entry = await apiEntries.getEntry(projectId, entryId)
    res.status(OK).send(entryForPublic(entry))
  })

  app.options('/entries/ident/:identificator')

  app.get('/entries/ident/:identificator', checkApiKey, async (req, res) => {
    const { projectId } = req
    const { identificator } = req.params
    const entry = await apiEntries.getEntryByIdentificator(projectId, identificator)
    res.status(OK).send(entryForPublic(entry[0]))
  })

  app.get('/files/:fileId/:fileName', checkFileRedirect, checkApiKey, async (req, res) => {
    const { projectId } = req
    const { fileId, fileName } = req.params
    const file = await apiFiles.getFile(projectId, fileId, fileName)
    res
      .status(OK)
      .set('Content-Type', file.mimetype)
      .send(file.buffer)
  })

  app.options('/tmp/contacts')

  app.post('/tmp/contacts', async (req, res) => {
    const { body } = req
    await apiContacts.postContact(body)
    res.status(OK).send(getStatusMessage(OK))
  })
}

module.exports = { setPublicRoutes }
