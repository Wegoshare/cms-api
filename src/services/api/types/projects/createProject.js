const tv4 = require('tv4')
const { ApiError } = require('../../../../helpers/ApiError')
const { BAD_REQUEST } = require('http-status-codes')

const createProject = (project, { noId }) => {
  const schema = {
    type: 'object',
    additionalProperties: false,
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', minLength: 1 },
      name: { type: 'string', minLength: 1 },
      image: { type: 'string', minLength: 1 }
    },
  }
  if (noId) {
    schema.required = schema.required.filter(item => item !== 'id')
    delete schema.properties.id
  }
  const { valid, error } = tv4.validateResult(project, schema)
  if (!valid) {
    throw new ApiError(error.message, BAD_REQUEST)
  }
  return project
}

module.exports = { createProject }
