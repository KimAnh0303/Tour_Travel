const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const db = require('./queries')
const app = express();
const port = 3001;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Template engine
const hbs = exphbs.create({
// Optional configurations (e.g., defaultLayout, helpers)
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Rounting
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('new');
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})