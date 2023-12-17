const { Server } = require("socket.io");

// const initSocket = (httpServer) => {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
//   });

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "https://kindim-na-ta.onrender.com",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("send_rating", (rating) => {
      io.emit("receive_rating", rating);
    });

    socket.on("send_review", (review) => {
      io.emit("receive_review", review);
    });
  });
};

module.exports = initSocket;
