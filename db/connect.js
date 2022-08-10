const mongoose = require("mongoose");

const connectDB = async (app, port) => {
  const connect = await mongoose.connect(`${process.env.MONGO_URI}`); //local scope

  //cek kalo connect promise nya udah terpenuhi jalankan server
  if (connect) {
    app.listen(port, () => console.log(`run on port : ${port}`));
  }
};

module.exports = connectDB; //export default
