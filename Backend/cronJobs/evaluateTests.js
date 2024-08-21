const cron = require("node-cron");
const Submission = require("../models/submissionModel");
const Test = require("../models/testModel");
const sendScoreEmail = require("../utils/emailService"); 

cron.schedule("0 * * * *", async () => {
    try {
        // Fetch all submissions that need to be evaluated
        const submissions = await Submission.find({
          endedAt: { $ne: null },
          isEvaluated: false,
        });
    
        for (const submission of submissions) {
          const test = await Test.findById(submission.testId).populate("questions");
          let score = 0;
          submission.selections.forEach((selection) => {
            const question = test.questions.find(
              (q) => q._id.toString() === selection.questionId.toString()
            );
            if (question && question.correctOption === selection.answer) {
              score += question.marks;
            }
          });
    
          // Update the submission with the score
          submission.score = score;
          submission.isEvaluated = true; // Mark as evaluated
          await submission.save();
        
          const testName = test.title || "Test";
    
          // Send email with the score
          await sendScoreEmail(submission.userId, score, testName);
        }
        console.log("Test evaluation completed and emails sent");
      } catch (error) {
        console.error("Error in cron job:", error);
      }
});
