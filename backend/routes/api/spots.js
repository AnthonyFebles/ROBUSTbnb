const express = require("express");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require("../../utils/auth");
const { Spot, SpotImage, Review, User, sequelize } = require("../../db/models");
const spot = require("../../db/models/spot");

const router = express.Router();

router.get("/", async (req, res) => {
	const allSpots = await Spot.findAll();

	return res.json({
		spots: allSpots,
	});
});

router.post("/", requireAuth, async (req, res) => {
	const { user } = req;
	if (user) {
		const safeUser = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
		};
	}

	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	try {
		const newSpot = await Spot.create({
			ownerId: req.user.id,
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		});
		return res.json(newSpot);
	} catch (error) {
		res.status(400);
		res.json({
			message: "Bad Request",
			errors: error.errors[0].message,
		});
		console.log(error);
	}
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
	const spotId = req.params.spotId;
	const ownerId = req.user.id;
	const currSpot = await Spot.findByPk(spotId);
	const { url } = req.body;

	if (!currSpot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	if (ownerId !== currSpot.ownerId) {
		res.status(200);
		return res.json({
			message: "Not authorized to make edits to this spot",
		});
	}

	const newImg = await SpotImage.create({
		url,
		spotId,
		isPreview: true,
	});

	return res.json({
		id: newImg.id,
		url: newImg.url,
		preview: newImg.isPreview,
	});
});

router.get("/current", requireAuth, async (req, res) => {
	const ownerId = req.user.id;

	const yourSpots = await Spot.findAll({
		where: {
			ownerId,
		},
	});

	return res.json(yourSpots);
});

router.get("/:spotId", requireAuth, async (req, res) => {
	const { spotId } = req.params;

	const testIfExist = await Spot.findByPk(spotId)

	if (!testIfExist) {
		res.status(404);
		res.json({
			message: "Spot couldn't be found",
		});
	}

	const currSpot = await Spot.findAll({
		where: {id: spotId},

		include: [
			{
				model: Review,
				attributes: [
					[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
					
					
				],
			},
			// {
			// 	model: User,
			// 	// attributes: ["id", "firstName", "lastName"],
			// },
			// {
			// 	model: SpotImage,
			// 	// attributes: ["id", "url", "isPreview"]
			// },
		],
	});

	

	let spotList = []
	
	currSpot.forEach(spot => {
		spotList.push(spot.toJSON())
	});


    if (spotList[0].Reviews[0]){ 
			spotList[0].avgRating = spotList[0].Reviews[0].avgRating;
	delete spotList[0].Reviews
	}			


    const images = await SpotImage.findAll({
        where : {
            spotId  
        }
    })

	let imageList = []

	images.forEach(image=> {
		imageList.push(image.toJSON())
	})

	for (let i = 0; i < imageList.length; i++) {
		let currImg = imageList[i]

		delete currImg.spotId
		if (currImg.isPreview === true) {
			spotList[0].previewImage = currImg.url
		}
	}

	spotList[0].SpotImages = imageList

    const owner = await User.findAll({
        where : {
            id: spotList[0].ownerId
        }
    })

	const ownerList = []

	owner.forEach(owner=> {
		ownerList.push(owner.toJSON())
	})

	for (let i = 0; i < ownerList.length; i++) {
		let currOwner = ownerList[i];

		delete currOwner.username;
	}

	spotList[0].Owner = ownerList


	
	//Need to aggregate the number of reviews and average them
	//Need to figure out how ot give an array of images for the previewImage
	//probably need to make seed data for reviews
    //! Working on this part. Getting details for a single spot including images, reviews, and owner name and id. 

	res.json(
		spotList
	);
});


router.put("/:spotId", async (req, res) => {

	const { spotId } = req.params
	const { address, city, state, country, lat, lng, name, description, price } = req.body


})


module.exports = router;
