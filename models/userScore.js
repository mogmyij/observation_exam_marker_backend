const mongoose = require("mongoose");
const { schema } = require("./user");

//tracks user score using a 1-1 relationship
const userScoreSchema = mongoose.Schema({
	id: String,

	question1a1Score: Number,
	question1a2Score: Number,
	question1a3Score: Number,
	question1c1Score: Number,
	question1c2Score: Number,
	question1c3Score: Number,

	question2b1: Number,
	question2b2: Number,
	question2b3: Number,
	question2b4: Number,
	question2b5: Number,
	question2b6: Number,
	question2b7: Number,
	question2b8: Number,

	question3c1: Number,
	question3c2: Number,
	question3c3: Number,
	question3c4: Number,

	question4b1: Number,
	question4c1: Number,

	question1TEFScore: Number,
	question2TEFScore: Number,
	question3TEFScore: Number,
	question4TEFScore: Number,
	question5TEFScore: Number,

	totalScore: Number,
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserScore", userScoreSchema);
