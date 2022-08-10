const userSchema = require("../db/schema/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleErrorResponse = (res, msg, httpcode = 500) => {
  return res.status(httpcode).json(msg);
};

async function SignInHandle(req, res) {
  //test
  const { email, password } = req.body;
  //comparison query operator, $eq
  const findAccount = await userSchema.findOne({ email: { $eq: email } });

  if (!findAccount) {
    return handleErrorResponse(res, "account not find", 401); //unauthorized
  }

  //verifikasi password , yang mana,ngnecek password yang udah dihash pake compare
  const verifyPass = bcrypt.compareSync(password, findAccount?.password); // expected result true

  if (verifyPass === false) {
    return handleErrorResponse(res, "password wrong", 401);
  }

  try {
    const generateToken = jwt.sign(
      {
        email: findAccount?.email,
        name: findAccount?.name,
        _id: findAccount?._id,
      },
      `${process.env.SECRET}`,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({ result: findAccount, token: generateToken });
  } catch (err) {
    return handleErrorResponse(res, err.message, 500);
  }
}

async function SignUpHandle(req, res) {
  const { name, email, password } = req.body;

  const findAccount = await userSchema.findOne({ email: { $eq: email } });

  if (findAccount) {
    return handleErrorResponse(res, "account exists", 406);
  }

  const hashPassword = bcrypt.genSalt(10, async (err, salt) => {
    if (err) {
      return handleErrorResponse(res, err, 500);
    }

    const hashPassword = bcrypt.hashSync(password, salt);

    const initObject = new userSchema({
      name: name,
      email: email,
      password: hashPassword,
    });

    try {
      const saved = await initObject.save();
      const generateToken = jwt.sign(
        {
          email: saved?.email,
          name: saved?.name,
          _id: saved?._id,
        },
        `${process.env.SECRET}`,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({ result: saved, token: generateToken });
    } catch (err) {
      handleErrorResponse(res, err.message, 500);
    }
  });

  //ada error di tokennya
}

module.exports = { SignInHandle, SignUpHandle };

//dah sesai dah
