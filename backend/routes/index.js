const express = require('express')
const router = express.Router()
const apiRouter = require('./api')

//XSRF-TOKEN cookie
router.get('/hello/world', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.send('Hello World!')
})

//re-set the CSRF token cookie
router.get("/api/csrf/restore", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("XSRF-TOKEN", csrfToken);
	res.status(200).json({
		"XSRF-Token": csrfToken,
	});
});

router.use('/api', apiRouter)

module.exports = router