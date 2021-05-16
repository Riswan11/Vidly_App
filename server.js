const express = require('express');
const app = express();


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
    const genre = [
        {
            id: genres.length + 1,
            name: req.body.name
        }
    ]
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on PORT Number ${PORT}`);
})