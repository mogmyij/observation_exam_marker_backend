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
const cors = require("cors");
const userScore = require("./models/userScore");

//express middleware (executes after getting request)
app.use(express.json());
app.use(cors());

//--------------------- API ROUTES ---------------------------//
//add user most often used when frontend login page is submitted
app.post("/api/users", (request, response) => {
	const newUser = new User(request.body);
	const newUserScore = new UserScore({ user: newUser._id });

	//save both newUser and newUserScore
	newUserScore.save().then((saved) => {
		newUser.save().then((dbResponse) => {
			return response.json(dbResponse);
		});
	});
});

//get list of all userScores by populating the virtuals of the user documents
app.get("/api/userScore", async (request, response) => {
	const userScores = await userScore
		.find()
		.sort({_id: -1})
		.populate({ path: "user", select: "name nric -_id" });
	return response.json(userScores);
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
//responds with the admin or user website based on URL used
//the express.static option index is set to false to prevent URL overlapping
app.use(express.static("staticRoutes/userSite/build",{index: false}));
app.use(express.static("staticRoutes/adminSite/build",{index: false}));
app.get("/tfcadmin", (request, response) => {
	response.sendFile(path.join(__dirname, "/staticRoutes/adminSite/build/index.html"));
});
app.get("/*", (request, response) => {
	response.sendFile(path.join(__dirname, "/staticRoutes/userSite/build/index.html"));
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`backend server running on port ${PORT}`);
});
