const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.static(publicDirectoryPath))

//setup handlebars engines and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Pranchal'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
        title: 'This is about title',
        name: 'Pranchal'
    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is help',
        title: 'help',
        name: 'Pranchal'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
                error: error
            })
          }
          res.send({
              forecast: forecastData,
              location: location,
              address: req.query.address
          })
        })
    
      })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        message:'Help article not found',
        name: 'Pranchal',
        title: '404'
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        message: 'Page not found',
        name: 'Pranchal',
        title: '404'
    })
})



app.listen(port, () => {
    console.log('Server started at port '+ port)
})