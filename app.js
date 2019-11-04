const ejs = require('ejs')
const express = require('express')

const app = express();

app.set('view engine', 'ejs');

//Public Folder

app.use(express.static('./public'));

//Routes
app.get('/', function (req, res) { res.render('index.ejs') });

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));