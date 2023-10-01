const router = require('express').Router()
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter =  require("./spots.js");
const reviewsRouter = require("./reviews.js")
// const { setTokenCookie } = require("../../utils/auth.js"); testing
// const { User } = require("../../db/models"); testing
const { restoreUser } = require("../../utils/auth.js");
// const { requireAuth } = require("../../utils/auth.js"); testing 

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter);

router.use("/reviews", reviewsRouter);

router.post("/test", (req, res) => {
	res.json({ requestBody: req.body });
});


// //test api router
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

// //test user auth middleware
// router.get("/set-token-cookie", async (_req, res) => {
// 	const user = await User.findOne({
// 		where: {
// 			username: "Isa-Demo",
// 		},
// 	});
// 	setTokenCookie(res, user);
// 	return res.json({ user: user });
// });

// //test restore user middleware
// router.get("/restore-user", (req, res) => {
// 	return res.json(req.user);
// });

// //test require auth middleware 
// router.get("/require-auth", requireAuth, (req, res) => {
// 	return res.json(req.user);
// });


module.exports = router 