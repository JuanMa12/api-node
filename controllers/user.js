'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  console.log('POST /api/user/signUp')
  console.log(req.body)

  const user = new User({
    email: req.body.email,
    name: req.body.name
  })
  user.setPassword(req.body.password)

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  console.log('POST /api/user/signIn')
  console.log(req.body)

  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })
    var validate = user.validPassword(req.body.password);
    if (!validate) return res.status(201).send({message : "Password Incorrect"})
    
    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}
