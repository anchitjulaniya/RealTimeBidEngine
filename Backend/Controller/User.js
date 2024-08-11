const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const userList = await User.findOne({ email });
    console.log("UserList", userList)
    if (userList) {
      return res.status(409).json({
        status: false,
        message: "User already registered. Please login.",
      });
    }

    // Hash the password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user object
    const newUser = await User.create({
      name: name,
      email: email,
      password: password  // hashedPassword
    })

    console.log("newUser from signUp Controller", newUser)

    res.status(201).json({
      status: true,
      message: "Account successfully created.",
    })

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again!",
      errorMessage: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: 'Invalid email.' });
    }

    // Debug: Log the retrieved user's password
    console.log("Retrieved hashed password:", user.password);

    // Compare passwords
    // const isPasswordIsSame = await bcrypt.compare(password, user.password || "");
    // console.log("Password comparison result:", isPasswordIsSame);

    // if (!isPasswordIsSame) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Entered Password is Incorrect. Please try again!",
    //   });
    // }

    // Generate a JWT token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });

    res.status(200).json({
      status: true,
      message: "Signin successful",
     // token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};

