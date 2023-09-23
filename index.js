require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const UserScore = require("./models/userScore");
const user = require("./models/user");
const { log } = require("console");
const router = express.Router();

//express middleware (executes after getting request)
app.use(express.json());

/*
const testUserScore = new UserScore({
	id: 0,

	question1a1Score: 5,
	question1a2Score: 0,
	question1a3Score: 0,
	question1c1Score: 0,
	question1c2Score: 0,
	question1c3Score: 0,

	question2b1: 0,
	question2b2: 0,
	question2b3: 0,
	question2b4: 0,
	question2b5: 0,
	question2b6: 0,
	question2b7: 0,
	question2b8: 0,

	question3c1: 0,
	question3c2: 0,
	question3c3: 0,
	question3c4: 0,

	question4b1: 0,
	question4c1: 0,

	question1TEFScore: 0,
	question2TEFScore: 0,
	question3TEFScore: 0,
	question4TEFScore: 0,
	question5TEFScore: 0,

	totalScore: 0,
	user: "64e42f59fbd2a5c629374948",
});

testUserScore.save()*/

const testVirtual = User.findById("64e42f59fbd2a5c629374948").populate("userScore").then(response=>{
	console.log(response.userScore);
})

//add user most often used when frontend login page is submitted
app.post("/api/users", (request, response) => {
	const newUser = new User(request.body);
	newUser.save().then((dbResponse) => {
		return response.json(dbResponse);
	});
});

app.get("/api/userScore", async (request, response) => {
	const users = await user.find();
	const scores = await Promise.all(users.map(async (curr) => {
		const populatedUser = await curr.populate("userScore")
		return populatedUser.userScore
	}
	))
	console.log(scores);
	return response.json(scores)
});

//update the user data: most often used when frontend user data is updated eg when navigating between questions
app.put("/api/users/:id", (request, response) => {
	const data = request.body;
	const id = request.params.id;
	User.findOneAndUpdate({ _id: id }, data, { new: true }).then((data) => {
		return response.json(data);
	});
});



//---- STATIC ROUTES -----//
//responds with the app when root of website is visited
app.use(express.static("build"));
app.get("/*", (request, response) => {
	response.sendFile(path.join(__dirname, "/build/index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`backend server running on port ${PORT}`);
});
