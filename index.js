//import
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/product')

//const  Product = require('./models/product')

//server
const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//routes (peticiones)
/**
app.get('/home/:name', (req, res) => {
    //res.send({ message: 'Welcome to Api Rest'})
    res.send({ message: `Welcome ${req.params.name} to Api Rest` })
}) */

//Api rest
// shop online example (product model)
//routes (endspoints)

app.get('/api/product', (req, res) => {
    //res.send(200, {products: []})

    Product.find({}, (err, products)=>{
        if (err)return res.status(500).send({
            message: `Error when requesting: ${err}`
        })

        if (!products) return res.status(404).send({
            message: 'There are no product'
        })
        res.send(200, {products})
    })


})

app.get('/api/product/:productId', (req, res) =>{
    let productId = req.params.productId

    Product.findById(productId, (err, product)=>{
        if (err) return res.status(500).send({
            message:`Error when requesting: ${err}`
        })

        if (!products) return res.status(404).send({
            message: 'There are no product'
        })
        res.send(200, {products}) 

    })

})

app.post('/api/product', (req, res) => {
    //console.log(req.body)

    //res.status(200).send({ message: 'product received'})
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.price = req.body.price
    product.category = req.body.category
    product.image = req.body.image


    product.save ( (err, productStored)=>{
        if (err)return res.status(500).send({
            message: `Error when requesting: ${err}`
        })
        res.status(200).send({product: productStored})
    })

   


    res.status(404).send({ message: 'product does not exist'})
})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/: productId', (req, res) => {

})

//server config
const server = app.listen(port, () => {

    console.log( `Servidor conectado http://localhost:${ server.address().port }` )
})

mongoose.connect('mongodb://127.0.0.1:27017/shopp', (err,res)=>{

    if (err)throw err
    console.log('Database connection ok')

    const server = app.listen(port, ()=> {
        console.log(`Listening http://localhost:${server.address().port}`)
    })
})