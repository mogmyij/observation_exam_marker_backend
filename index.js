require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const cors = require("cors");

//express middleware (executes after getting request)
//app.use(cors)
app.use(express.json());
//responds with the app when root of website is visited
app.use(express.static("./observation_exam_marker/build"));

//add user most often used when frontend login page is submitted
app.post("/api/users", (request, response) => {
	const newUser = new User(request.body);
	newUser.save().then((dbResponse) => {
		return response.json(dbResponse);
	});
});

//update the user data: most often used when frontend user data is updated eg when navigating between questions
app.put("/api/users/:id", (request, response) => {
	const data = request.body;
	const id = request.params.id;
	User.findOneAndUpdate({_id:id},data,{new:true}).then(data=>{
		return response.json(data)
	})
});



const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`backend server running on port ${PORT}`);
});
