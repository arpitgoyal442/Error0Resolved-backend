import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import doubtroutes from "./routes/doubt.route.js"
import debuggerroutes from "./routes/debugger.route.js"
import studentroutes from "./routes/student.route.js"
import authRoutes from "./routes/auth.route.js"

import { createServer } from "http";
import { Server } from "socket.io";




import cors from "cors"
const app = express();
app.use(cors());
 
//  Socket.io ***START

const server=createServer(app);
const io= new Server(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST","PUT","DELETE"]
    }
  });


  global.onlineUsers=new Map();

  
io.on("connection",(socket)=>{

  

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (to,msg) => {
    const sendUserSocket = onlineUsers.get(to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", msg);
    }
  });

    


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





//  app.listen('9000', () => {

//     console.log("App Started on port 9000");
// })

server.listen(9000,()=>{

    console.log("server listening on port 9000...")
})

export default io;

