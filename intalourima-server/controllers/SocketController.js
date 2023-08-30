const { User, Record } = require("../models");

const SocketController = (socket) => {
  socket.on("get_leaderboard", async (data) => {
    try {
      const { tanggal, event } = data;
      let option = {
        where: {},
        include: [{ model: User }],
        order: [["id", "DESC"]],
      };

      if (tanggal) {
        option.where.tanggal = tanggal;
      }
      if (event) {
        option.where.event = event;
      }
      const allRecord = await Record.findAll(option);
      socket.emit("receive_leaderboard", allRecord);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = SocketController;
