const Joi = require('joi');
const express = require('express');
const app = express();
let mongoose = require('mongoose');
const Genre = require('./models/genres')


//Connect to MongoDb
mongoose.connect('mongodb://localhost:127.0.0.1:27017/moviesApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection is Open")
    })
    .catch((err) => {
        console.log('There was an error!! Try Again');
        console.log(err);
    })


//Mongoose and mongo sound box
app.get('/add-movie', (req, res) => {
    const genre = new Genre({
        year: 2019,
        movieType: "Series",
        movieName: "Power"
    });
    genre.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

//Calling and adding a piece of middleware
app.use(express.json())

const genres = [
    {
        id: 1,
        Action: ['Hero', 'Snakeman', 'Mr Beast'],
        year: 2019,
        PG: 8
    },
    {
        id: 2,
        Anime: ['Naruto', 'Hero Academia', 'Attack on Titans'],
        year: 2020,
        PG: 9
    },
    {
        id: 3,
        Commedy: ['Mr Bones', 'Comming to America', 'Flashlight'],
        year: 2000,
        PG: 11
    },
    {
        id: 4,
        Series: ['Power', 'Prison Break', 'Game of Thrones'],
        year: 2016,
        PG: 18
    }
]

app.get('/vidly.com/api/genres', (req, res) => {
    res.send(genres);
})

app.get('/vidly.com/api/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('The Genre was not found');
    res.send(genre);



})

app.post('/vidly.com/api/genres', (req, res) => {

    if (!req.body.Series || req.body.Series.length < 3) {
        res.status(400).send('This is a bad request')
        return;
    }

    const genre = [
        {
            id: genres.length + 1,
            Series: req.body.Series,
            year: req.body.Year,
            PG: req.body.PG
        }
    ]
    genres.push(genre);
    res.send(genre);
})


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Running on PORT Number ${PORT}`);
})
