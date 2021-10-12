//nodejs server
const twilio = require('twilio');
const express = require("express");
//creating an object for receiving msgs
const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
const app = express();
const port = 3000; 

//ID of my twilio account
const accountSid = process.env.ACCOUNT_SID;
//password of twilio account
const authToken = process.env.TWILIO_AUTH;
const twilioPhone = process.env.TWILIO_NUMBER;

//initialize the twilio client. Part of the twilio libs and it wraps the rest api. 
//Which means it can interact only with http requests.
const client = new twilio(accountSid, authToken);

app.use(express.urlencoded({ extended: false }));

//one endpoint
app.get("/", (req, res) => {
  res.send("Hello World!"); 
});

app.get("/text", (req,res)=>{
  client.messages.create({
    body: "Hello to MLH LHD",
    to: process.env.AMRUT_PHONE,
    from: twilioPhone,

  }).then((message)=>{
    console.log(`Message sent: ${message.sid}`);
    //sends a msg to my number
    res.send(`Message sent: ${message.sid}`);
  });
});

app.post("/incoming", (req, res) => {
  console.log(req.body.Body);
  const twiml = new MessagingResponse();
  twiml.message(`You are in Guild: ${req.body.Body}`);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});





app.listen(port, () => {
  console.log(`Example app listening at "http://localhost:${port}`);
});
