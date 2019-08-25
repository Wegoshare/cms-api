/*global describe, it, before, after*/

const { request } = require('../helpers/request')
const { getAuth } = require('../helpers/getAuth')
const { getProject } = require('../helpers/getProject')
const { getProjectPermission } = require('../helpers/getProjectPermission')
const { routes } = require('./routes')
const { routeDesc, routeParams } = require('./params')
const { getModel } = require('../helpers/getModel')

describe('Check model permission', () => {
  let auth
  const projects = []
  let projectPermission
  let model

  before(async () => {
    auth = await getAuth()
    projects.push(await getProject(), await getProject())
    projectPermission = await getProjectPermission(auth, projects[0])
    model = await getModel(projects[1])
  })

  routes.forEach(({ route, methods }) => {
    methods.forEach(({ method, tests }) => {
      if (!tests.checkModelPermission) return
      it(`${method.toUpperCase()} ${route(routeDesc)}`, done => {
        request[method](route({ ...routeParams, projectId: projects[0].project.id, modelId: model.model.id }))
          .set('AccessToken', auth.accessToken.token)
          .expect(404, { message: 'Model not found' })
          .end(done)
      })
    })
  })

  after(async () => {
    await auth.remove()
    await Promise.all(projects.map(item => item.remove()))
    await projectPermission.remove()
    await model.remove()
  })
})