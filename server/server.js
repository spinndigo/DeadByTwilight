var express = require('express'); // for running a server
var bodyParser = require('body-parser'); // for processing JSON submitted in the request body
var Pusher = require('pusher'); // for connecting to Pusher
const shortid = require('shortid');

require('dotenv').config();

var app = express();
app.use(bodyParser.json()); // for parsing JSON strings passed in the request body
app.use(bodyParser.urlencoded({ extended: false })); // for parsing URL encoded request body

var pusher = new Pusher({ // connect to pusher
  appId: process.env.APP_ID, // load the Pusher app settings from the .env file
  key: process.env.APP_KEY, 
  secret:  process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER, 
  useTLS: true,
  channelAuthorization: {
    endpoint: "https://dead-by-twilight-express-server.onrender.com/pusher/auth",
  }
});

app.get('/', function(_req, res){ // for testing if the server is running
  res.send('everything is good...');
});

app.post('/pusher/auth', function(req, res) { // authenticate user's who's trying to connect
  console.log('someone is trying to authorize..');
  var user_id = shortid.generate();
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  
  console.log(req.body);

  const user = {
    user_id: user_id,
    user_info: {
      name: 'Ben'
    }
  };

  var auth = pusher.authorizeChannel(socketId, channel, user );
  console.log('auth : ' , auth);
  res.send(auth);
});

console.log(`running server on port ${process.env.PORT} `);
var port = process.env.PORT || 5001;
app.listen(port);
