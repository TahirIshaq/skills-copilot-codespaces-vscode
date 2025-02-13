// Create web server
// 1. Create a web server that listens to port 3000
// 2. Create a route for GET /comments
// 3. Read the comments.json file and send the content of the file as a response
// 4. Create a route for POST /comments
// 5. Read the comments.json file
// 6. Parse the JSON content of the file into an array
// 7. Push the new comment into the array
// 8. Write the array back to the file
// 9. Send a response to the client
// 10. Test the endpoints using Postman

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments');
      return;
    }

    res.send(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(req.body);

    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing comments');
        return;
      }

      res.send('Comment added successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
// When you run the server and test the endpoints using Postman, you should