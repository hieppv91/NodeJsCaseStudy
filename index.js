require('./config/db.config');
const express = require('express');
const app = express();
const port = process.env.PORT || 3301;
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoute');
const expressSession = require('express-session');
const PostModel = require('./model/Post');

const checkAuth = require('./middleware/auth');


global.loggedIn = null;
global.postedit = null;

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressSession({
    secret: 'secret'
}))

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})

app.set('view engine', "ejs");
app.set('views', "./views");


app.get('/', checkAuth, (req, res) => {
    PostModel.find({}, function(error, posts) {
        if (error) return res.end(error);
        res.render('index', {
            blogposts: posts
        })
    })
});

app.get('/contact', checkAuth, (req, res) => {
    res.render("contact");
});

app.use('/user', userRoute);
app.use('/post', postRoute);

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});