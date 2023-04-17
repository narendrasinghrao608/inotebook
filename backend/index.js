const connectToMongo=require('./db.js');
const express = require('express')
const cors=require('cors')
connectToMongo();
const port = 5000
const app = express()
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/', (req, res) => {
  res.send('Hare krishna')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})