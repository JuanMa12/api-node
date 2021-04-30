'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!product) res.status(404).send({message: 'El producto no existe'})

    res.status(200).send({ model: product, status: 200 })
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err)  res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!products)  res.status(404).send({message: 'No existen productos'})

    res.status(200).send({ list: products, status: 200 })
  })
}

function saveProduct (req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({message: `Error al realizar la petición: ${err} `})

    Product.find({}, (err, products) => {
      res.status(200).send({ list: products, status: 200 })
    })
  })
}

function updateProduct (req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

    res.status(200).send({ model: productUpdated })
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId
  console.log('DELETE /api/product')

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({message: 'El producto ha sido eliminado',model: product })
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
