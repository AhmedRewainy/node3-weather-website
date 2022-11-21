const path =require ('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utlis/geocode')
const forrecast = require('./utlis/forrecast')

const app = express()
const port=process.env.PORT || 3000

//define path
const publicDirectory = path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

//setup handelsbars for express
app.use(express.static(publicDirectory))
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup directory
app.set('views', viewsPath)

app.get('',(req, res) =>{
    res.render('index', {
        title:'Weather App',
        name:'Ahmed Rewainy'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About',
        name:'Ahmed Rewainy'
    })
})

app.get ('/help', (req,res)=>{
    res.render ("help", {
        title:'help page',
        name:'Ahmed Rewiny'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {})=>{
        if(error){
            return res.send({error})
        }
        forrecast(latitude, longitude, location, (error, forecatsData)=> {
            if(error){
                return res.send({error})
            }

            res.send ({
                forrecast: forecatsData,
                location,
                address: req.query.address
            })
        })
    })
})
   

app.get('/products', (req,res)=>{
if(!req.query.search) {
    return res.send({
        error:'you must provide search term'
    })
  }

    console.log(req.query.search)
      res.send({
             products:[]
      })     
})
app.get('/help/*', (req,res)=>{
    res.render('404', {
        title:'404',
        name:'Ahmed',
        errorMessage:'Help artical not found'
    })
})

app.get('*', (req, res)=>{
res.render('404', {
    title:'404',
    name:'Ahmed',
    errorMessage:'Page not found'
})
})

app.listen(port, ()=> {
    console.log('Server is on port '+ port)

})