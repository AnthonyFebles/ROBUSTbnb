const express = require("express");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Spot } = require("../../db/models");

const router = express.Router();


router.get("/",async (req, res) => {
    const allSpots = await Spot.findAll( 
    )

    return res.json({
        spots : allSpots
    })
})

module.exports = router;