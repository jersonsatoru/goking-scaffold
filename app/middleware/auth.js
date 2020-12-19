import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'
import repository from '../repository/auth.repository'

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'No token provided',
    })
  }

  const parts = authHeader.split(' ')

  if (!parts.length === 2) {
    return res.status(401).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Token error',
    })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Token malformatted',
    })
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: 'Token invalid',
      })
    }

    //Get user data by uuid
    repository.select(decoded.uuid).then((response) => {
      if (response) {
        req.userId = response.id
        req.userUuid = response.uuid
        req.userName = response.name
        req.userEmail = response.email
        req.userDocument = response.document
        req.userType = response.type
        return next()
      }
      return next()
    })
  })
}

export default auth
