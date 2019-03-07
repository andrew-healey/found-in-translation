const translate=require("google-translate-api");
const langs=require("./node_modules/google-translate-api/languages");
const shortenedLangs=Object.keys(langs);
const express=require("express");
const app=express();
const io=require('socket.io')(app.listen(3000,()=>console.log("server started")));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/dist/index.html");
});
app.use("/",express.static("dist"));
io.sockets.on("connection",(socket)=>{
    socket.on("translate",async (inputString="",recursions=10)=>{
        let editString=inputString;
        for(let i=0;i<recursions;i++){
            editString=await translate(editString,{to:shortenedLangs[Math.floor(Math.random()*shortenedLangs.length)]}).text;
        }
        socket.emit("translate result",editString);
    });
})