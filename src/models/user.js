const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Email is invalid"],
      required: true,
      minlength: 5,
    },
    phone: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        access: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        user.password = hashedPassword;

        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findUserByCredentials = async function (id, password) {
  const User = this;

  try {
    const user = await User.findOne({
      $or: [
        {
          email: id,
        },
        {
          username: id,
        },
      ],
    });

    if (!user)
      return Promise.reject({ message: "User not found", statusCode: 404 });

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res)
          return reject({ message: "Invalid credentials", statusCode: 401 });

        resolve(user);
      });
    });
  } catch (e) {
    Promise.reject(e);
  }
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.SECRET_KEY)
    .toString();

  user.tokens.push({ access, token });

  await user.save();

  return token;
};

UserSchema.statics.findUserByToken = async function (token) {
  const User = this;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (!decoded) {
    return Promise.reject({ message: "User unauthorized", status: 403 });
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.access": decoded.access,
    "tokens.token": token,
  });
};

UserSchema.methods.deleteAuthToken = function (token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: {
        token,
      },
    },
  });
};

UserSchema.methods.deleteAllAuthTokens = function () {
  const user = this;

  return user.update({
    $set: {
      tokens: [],
    },
  });
};

UserSchema.methods.toJSON = function () {
  const {
    email,
    username,
    firstname,
    lastname,
    phone,
    country,
    createdAt,
    updatedAt,
  } = this;

  return {
    email,
    username,
    firstname,
    lastname,
    phone,
    country,
    createdAt,
    updatedAt,
  };
};

const User = model("user", UserSchema);

module.exports = User;
