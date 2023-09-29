const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Sign up
const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
        .notEmpty()
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
        .notEmpty()
		.withMessage("Please provide a username with at least 4 characters."),
	check("username").not().isEmail().withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
        .notEmpty()
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

// router.post(
//   '/',
//   async (req, res) => {
//     const { email, password, username } = req.body;
//     const hashedPassword = bcrypt.hashSync(password);
//     const user = await User.create({ email, username, hashedPassword });

//     const safeUser = {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//       user: safeUser
//     });
//   }
//);

//post to "/" with signup validation 
router.post("/", validateSignup, async (req, res) => {
	const { email, password, username, firstName, lastName } = req.body;
	const hashedPassword = bcrypt.hashSync(password);

	const checkEmail = await User.findAll({
		where: {
			email
		}
	})

	const checkUsername = await User.findAll({
		where : {
			username
		}
	})

	

     const errors = {};

if (checkEmail.length || checkUsername.length){
	if (checkEmail.length){
		errors.email = "User with that email already exists"
	}

	if (checkUsername.length){
		errors.username = "User with that username already exists"
	}

	res.status(500)
	return res.json({
		message: "User already exists",
		errors: errors
	})
	
}

	const user = await User.create({ email, username, hashedPassword, firstName, lastName });

	const safeUser = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
	};

	await setTokenCookie(res, safeUser);

	return res.json({
		user: safeUser,
	});
});

router.get("/current", (req, res) => {
	const { user } = req;
	if (user) {
		const safeUser = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
		};
		return res.json({
			user: safeUser,
		});
	} else return res.json({ user: null });
});


module.exports = router;


