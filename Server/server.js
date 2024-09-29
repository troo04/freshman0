const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let food = [];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_date", (data) => {
    getData(data.date);
    socket.emit("receive_food", food);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

async function getData(data) {
    const url = `https://api.dineoncampus.com/v1/location/61f9d7c8a9f13a15d7c1a25e/periods?platform=0&date=${data}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      let items = json.menu.periods.categories[0].items;

      for (let pos in items) {
        food.push(items[pos].name);
      }

      console.log(food);

    } catch (error) {
      console.error(error.message);
    }
  }
