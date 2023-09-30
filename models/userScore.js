const mongoose = require("mongoose");
const { schema } = require("./user");

//tracks user score using a 1-1 relationship
const userScoreSchema = mongoose.Schema({
	id: String,

	question1a1Score: {type:Number, default:0},
	question1a2Score: {type:Number, default:0},
	question1a3Score: {type:Number, default:0},
	question1c1Score: {type:Number, default:0},
	question1c2Score: {type:Number, default:0},
	question1c3Score: {type:Number, default:0},

	question2b1Score: {type:Number, default:0},
	question2b2Score: {type:Number, default:0},
	question2b3Score: {type:Number, default:0},
	question2b4Score: {type:Number, default:0},
	question2b5Score: {type:Number, default:0},
	question2b6Score: {type:Number, default:0},
	question2b7Score: {type:Number, default:0},
	question2b8Score: {type:Number, default:0},

	question3c1Score: {type:Number, default:0},
	question3c2Score: {type:Number, default:0},
	question3c3Score: {type:Number, default:0},
	question3c4Score: {type:Number, default:0},

	question4b1Score: {type:Number, default:0},
	question4c1Score: {type:Number, default:0},

	question1TEFScore:{type:Number, default:0},
	question2TEFScore:{type:Number, default:0},
	question3TEFScore:{type:Number, default:0},
	question4TEFScore:{type:Number, default:0},
	question5TEFScore:{type:Number, default:0},

	totalScore: {type:Number, default:0},
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserScore", userScoreSchema);
