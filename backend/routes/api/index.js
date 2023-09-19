const router = require('express').Router()
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth.js");
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

//test api router
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

//test user auth middleware
router.get("/set-token-cookie", async (_req, res) => {
	const user = await User.findOne({
		where: {
			username: "Isa-Demo",
		},
	});
	setTokenCookie(res, user);
	return res.json({ user: user });
});

//test restore user middleware
router.get("/restore-user", (req, res) => {
	return res.json(req.user);
});

//test require auth middleware 
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
	return res.json(req.user);
});


module.exports = router 