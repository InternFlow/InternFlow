const Message = require('../Models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected');

    // Envoyer un message à un autre utilisateur
    socket.on('send message', async ({ fromUser, toUser, content }) => {
      try {
        // Crée le message dans la base de données
        const message = await Message.create({
          fromUser: fromUser,
          toUser: toUser,
          content: content
        });

        // Envoyer le message aux deux utilisateurs concernés
        socket.to(fromUser).to(toUser).emit('receive message', message);
      } catch (error) {
        console.error(error);
        socket.emit('error', error);
      }
    });
  });
};
