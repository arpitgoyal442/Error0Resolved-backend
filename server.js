import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import doubtroutes from "./routes/doubt.route.js"
import debuggerroutes from "./routes/debugger.route.js"
import studentroutes from "./routes/student.route.js"
import authRoutes from "./routes/auth.route.js"


import { createServer } from "http";
import { Server } from "socket.io";



const port=   process.env.PORT||9000;

import cors from "cors"
const app = express();




app.use(cors());


 
//  Socket.io ***START

const server=createServer(app);
const io= new Server(server,{
    cors: {
      origin: "https://errorresolved.netlify.app",
      // origin:  "http://localhost:3000",
      
      methods: ["GET", "POST","PUT","DELETE"]
    }
  });


  global.onlineUsers=new Map();

  io.on("connection",(socket)=>{

    // console.log(socket.id)

    socket.on("join-room", (userData) => {
      const { roomID, socketId } = userData;
      socket.join(roomID);
      console.log(socket.rooms)
      socket.broadcast.to(roomID).emit("new-user-connect", userData);
      socket.on("disconnect", () => {
        console.log("Disconnect ", socketId)
        socket.broadcast.to(roomID).emit("user-disconnected", socketId);
      });
    });
  
    global.chatSocket = socket;
    socket.on("add-user", (socketId) => {

      // console.log("User Added "+socketId+" : "+socket.id)
      onlineUsers.set(socketId, socket.id);
    });
  
    socket.on("send-msg", (to,msg) => {
      // console.log("from send-msg"+to);
      const sendUserSocket = onlineUsers.get(to);
      // console.log(sendUserSocket+" "+msg);
      if (sendUserSocket) {
        // console.log("sending msg-receive")
        socket.to(sendUserSocket).emit("msg-recieve", msg);
      }
    });
  
  
    socket.on("delete-doubt",(doubt)=>{
  
      console.log("Delete-request coming"+doubt._id)
  
      io.emit("deleted-doubt",doubt);
  
    })
  
  
    socket.on("add-doubt",(data)=>{
  
      console.log("Added Doubt is : ");
      console.log(data)
  
      io.emit("added-doubt",data);
  
    })


    socket.on("request-doubt",(data)=>{

      console.log("Requst-doubt data ");
      // console.log(data.doubtData);
      const sendUserSocket = onlineUsers.get(data.doubtData.studentId);
      
     
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("debugger-requesting", data);
      }

    })


    socket.on("request-accept",(data)=>{

      const sendUserSocket = onlineUsers.get(data.debuggerId);
      
     
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("student-accept-request", {message:data.message , doubtId:data.doubtId});
      }
    })


    socket.on("peerId",(data)=>{

      // console.log(data.receiverUserId);

      console.log("data from screenshare:");
      console.log(data)
      
      const sendUserSocket = onlineUsers.get(data.receiverUserId);
     
      console.log("User Socket "+sendUserSocket)


      if (sendUserSocket) 
        socket.to(sendUserSocket).emit("remotePeerId", {remotePeerId:data.peerId });
      

      


    })
  
  })

// Socket.io ***END


// MIddlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Database Connection

mongoose.connect("mongodb+srv://error_resolved:O0ow9RpxGQyu6QRw@cluster0.acw5v.mongodb.net/mydb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", () => { console.log("Error in Connection with DB") });
db.once("open", function () {
    console.log(" DB Connected successfully");
});





//  Routes
app.get("/", (req, res) => {

    res.send("Welcome To Error:Resolved");
})

app.use("/doubt/",doubtroutes);
app.use("/debugger/",debuggerroutes);
app.use("/student/",studentroutes);
app.use("/",authRoutes);


server.listen(port,()=>{

    console.log("server listening on port "+port)
})

export default io;

