const express = require("express");
const app = express();

app.use(express.static('public'));

/*
app.get("/api/photo/list", function(req, res, next){
    res.json(photoList);
});
*/
const server = app.listen(3001, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

