import io from "socket.io-client";
//import translate from "google-translate-api";
const socket=io();
const {input,output,run}=document.translate;
socket.on("translate result",res=>{
    output.value=res;
});
run.addEventListener("click",()=>{
    socket.emit(input.value);
});