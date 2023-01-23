const express= require("express");
const https= require("https");
const bodyparser= require("body-parser");
const port = process.env.PORT || 3000;
const app= express();
app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));

// On the home route, send signup html template
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

// Manage post request on home route and
// Send data to the MailChimp account via API 
app.post("/",function(req,res){
  var firstName=req.body.mainName;
  var email=req.body.mainEmail;

  var data={
    members:[{
      email_address: email,
      status: "subscribed",
        FNAME: firstName

    }]
  }

// Converting string data to JSON data
const jsonData= JSON.stringify(data);
const url="https://us8.api.mailchimp.com/3.0/lists/f1e477060c";
const options={
  method:"POST",
  auth:"201951173:7517e83fa72249ee8d1eed4a0022a617-us8"
}

// On success send users to success, otherwise on failure template 
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.send("Nice")
  }else{
    res.send("not bad")
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});
  request.write(jsonData);
  request.end();
});

// Failure route
app.post("/failure",function(req,res){
   res.redirect("/");
})

app.listen(port,function(){
  console.log("server is running on port 8000.");
})

//api key
//7517e83fa72249ee8d1eed4a0022a617-us8

//list id
//f1e477060c