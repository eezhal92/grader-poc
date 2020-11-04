const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();

function createTempFile ({ filename, code }) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`tmp/${filename}`, code, (err) => {
      if (err) return reject(err);

      resolve();
    });
  });
}

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.post('/run', async (req, res) => {
  const { sessionId, code } = req.body;
  const filename = sessionId;
  
  await createTempFile({ filename, code });

  console.time('test-time')
  try {
    await runTests(filename);
  } catch (err) {
    console.log(err)
  }
  console.timeEnd('test-time')
  const { numFailedTests, numPassedTests, numTotalTests }  = readTestResult()
  return res.json({ numFailedTests, numPassedTests, numTotalTests });
});

function runTests (filename) {
  return new Promise((resolve, reject) => {
    exec(`yarn test -session=${filename} -o=false`, (err, stdout, stderr) => {
      if (err) return reject(err);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      
      
      resolve();
    });
  });
}

function readTestResult () {
  const rawdata = fs.readFileSync('test-result.json');
  return JSON.parse(rawdata);
}

app.listen(4000);