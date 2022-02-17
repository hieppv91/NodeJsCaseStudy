require("./config/db.config");
const express = require("express");
const app = express();
const port = process.env.PORT || 3301;
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoute");
const aboutRoute = require("./routes/aboutRoute");
const expressSession = require("express-session");
const PostModel = require("./model/Post");

const checkAuth = require("./middleware/auth");
const { redirect } = require("express/lib/response");

global.loggedIn = null;

app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	expressSession({
		secret: "secret",
	})
);

app.use("*", (req, res, next) => {
	loggedIn = req.session.userId;
	next();
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.all("/", function (req, res) {
	PostModel.find({}, function (error, posts) {
		if (error) return res.end(error);
		res.render("index", {
			blogposts: posts,
		});
	});
});
app.use("/user", userRoute);
app.use("/post", checkAuth, postRoute);
app.use("/about", aboutRoute);

app.listen(port, () => {
	console.log(`App is listening at port ${port}`);
});
