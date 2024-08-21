function scoreTemplate({ name, score, testName }) {
    return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
  <title>Test Score Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
    }

    h1 {
      color: #007bff;
      font-size: 24px;
    }

    p {
      margin: 16px 0;
    }

    .content {
      padding: 20px 0;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }

    .footer {
      text-align: center;
      padding: 20px 0;
      border-top: 1px solid #eee;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Your Official Score for ${testName} is Here!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Congratulations! We have verified your proctored <strong>${testName}</strong>. Your official score for this assessment is <strong>${score}</strong>.</p>
      <h2>What’s Next?</h2>
      <p>Why stop here? We've crafted a custom, practice-based learning path tailored to your assessment results, designed to help you level up your skills and achieve your career goals.</p>
      <h3>Here’s how our learning paths work:</h3>
      <ul>
        <li><strong>Solve Real-World Problems</strong>: Tackle challenges that mirror the tasks you'll face in the tech industry.</li>
        <li><strong>Master In-Demand Skills</strong>: Build a comprehensive Skills Profile that showcases your abilities in the most sought-after areas.</li>
      </ul>
      <p>Unlock your potential and continue your journey to mastery.</p>
    </div>
    <div class="footer">
      <p>Team @ Exam Studio</p>
    </div>
  </div>
</body>

</html>
  `;
}

module.exports = scoreTemplate;