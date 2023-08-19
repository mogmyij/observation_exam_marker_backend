const mongoose = require("mongoose");

const QuestionFourObjSchema = new mongoose.Schema({
	b1: String,
	c1: String,
});

const QuestionThreeObjSchema = new mongoose.Schema({
	c1: String,
	c2: String,
	c3: String,
	c4: String,
});

const QuestionTwoObjSchema = new mongoose.Schema({
	b1: String,
	b2: String,
	b3: String,
	b4: String,
	b5: String,
	b6: String,
	b7: String,
	b8: String,
});

const QuestionOneObjSchema = new mongoose.Schema({
	a1: String,
	a2: String,
	a3: String,
	c1: String,
	c2: String,
	c3: String,
});

const InitialOrdersSchema = new mongoose.Schema({
	OPLocation: String,
	OPHeight: String,
	OTDistance: String,
	CallSign: String,
	FireMission: String,
	TargetGrid: String,
	Altitude: String,
	Direction: String,
	LRInitialDirection: String,
	LRInitialAdjustment: String,
	ADInitialDirection: String,
	ADInitialAdjustment: String,
	Ammo: String,
	TargetDescription: String,
	Vegetation: String,
	TargetFrontBearing: String,
	TargetFrontLength: String,
	MissionType: String,
	CheckPE: String,
	CheckAngleT: String,
	MethodOfFireControl: String,
});

const AdjustmentRowSchema = {
	Round: String,
	VRDirection: String,
	VRDistance: String,
	VRVerticalAngle: String,
	LRObservation: String,
	SLObservation: String,
	AmmoCorrection: String,
	LRCorrection: String,
	ADCorrection: String,
	AdditionalCorrection: String,
};

const PRCorrectionsSchema = new mongoose.Schema({
	PRRound1GraphLeftRight: String,
	PRRound1GraphLongShort: String,
	PRRound2GraphLeftRight: String,
	PRRound2GraphLongShort: String,
	PRRound3GraphLeftRight: String,
	PRRound3GraphLongShort: String,
	PRRound4GraphLeftRight: String,
	PRRound4GraphLongShort: String,
	PRRound1Left: String,
	PRRound1Right: String,
	PRRound1LongShort: String,
	PRRound2Left: String,
	PRRound2Right: String,
	PRRound2LongShort: String,
	PRRound3Left: String,
	PRRound3Right: String,
	PRRound3LongShort: String,
	PRRound4Left: String,
	PRRound4Right: String,
	PRRound4LongShort: String,
	PRTotalLeft: String,
	PRTotalRight: String,
	PRNumberOfRounds: String,
	PRMean: String,
	PROTFactor: String,
	PRFinalOrdersLeft: String,
	PRFinalOrdersRight: String,
	PRFinalOrdersAddDrop: String,
	PRFinalOrdersAddDropAmmount: String,
	PRRecordAsPoint: String,
	ActivationCodeword: String,
	TargetCodeword: String,
});

//object that will be populated with values from the form
const TEFObjSchema = new mongoose.Schema({
	//initial orders
	InitialOrders: InitialOrdersSchema,
	//list containing each row of correction
	AdjustmentRowList: [
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
		AdjustmentRowSchema,
	],
	//PR values
	PRCorrections: PRCorrectionsSchema,
});

const UserObjSchema = new mongoose.Schema({
	name: String,
	nric: String,
	id: String,
	questionOneObj: QuestionOneObjSchema,
	questionOneTEF: TEFObjSchema,
	questionTwoObj: QuestionTwoObjSchema,
	questionTwoTEF: TEFObjSchema,
	questionThreeObj: QuestionThreeObjSchema,
	questionThreeTEF: TEFObjSchema,
	questionFourObj: QuestionFourObjSchema,
	questionFourTEF: TEFObjSchema,
	questionFiveTEF: TEFObjSchema,
});

//URI to the database and password from .env file
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseUrl = `mongodb+srv://mogmyij:${databasePassword}@observationlevel1.5kkcv9y.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(databaseUrl).catch((error) => {
	console.log("cannot connect", error);
});

function removeId(object) {
	let objectKeyArray = Object.keys(object);

	//loop through each key and recursively call removeId for each object
	//and delete _id for each item in an array
	objectKeyArray.forEach((key) => {
		//_id returns obj when put into typeof() so need to ignore ID
		if (key == "_id" || key == "id") {
			return;
		}

		//check if object is array needs to be before check if it is an obj
		//because array will return that it is an obj
		if (Array.isArray(object[key])) {
			//loop through each array obj and delete _id
			object[key].forEach((arrayItem) => {
				delete arrayItem._id;
			});

			return;
		}

		//check if key is object if it is call removeId on the object
		if (typeof object[key] == "object") {
			removeId(object[key]);
		}
	});

	//base case is when we have looped through each key in the obj
	delete object._id;
	return;
}

UserObjSchema.set("toJSON", {
	transform: (document, returnedDoc) => {
		returnedDoc.id = document._id;
		delete returnedDoc.__v;
		removeId(returnedDoc);

		return returnedDoc;
	},
});

module.exports = mongoose.model("User", UserObjSchema);
