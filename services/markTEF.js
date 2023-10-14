const User = require("../models/user");

const TEFAnswers={
    questionOneTEFAns: 0,
    questionTwoTEFAns: 0,
    questionThreeTEFAns: 0,
    questionFourTEFAns: 0,
    questionFiveTEFAns: 0,
}

//function that marks the TEF of the UserId provided
async function markTEF(userId){
    const MarkedTEFScores = {
        questionOneTEF: 0,
        questionTwoTEF: 0,
        questionThreeTEF: 0,
        questionFourTEF: 0,
        questionFiveTEF: 0,
    }
    userTestScript= await User.findById(userId);
    

}

module.exports = markTEF