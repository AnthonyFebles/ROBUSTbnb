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

router.get("/:spotId", async (req, res) => {
	const { spotId } = req.params;

	const currSpot = await Spot.findByPk(spotId, {
		include: [
			{
				model: Review,
				attributes: [
					[
						sequelize.fn("AVG", sequelize.col("Reviews.stars")),
						"avgRating",
					],
				],
			},
			// {
			// 	model: User,
			// 	attributes: ["id", "firstName", "lastName"],
			// },
            // {
                
            //     model: SpotImage,
            //     attributes: ["id", "url", "isPreview"]
               
            // }
		],
       
		
		raw: true,
		
	});

    
						

    const images = await SpotImage.findAll({
        where : {
            spotId  
        }
    })

    const owner = await User.findAll({
        where : {
            id: currSpot.ownerId
        }
    })

	if (!currSpot) {
		res.status(404);
		res.json({
			message: "Spot couldn't be found",
		});
	}
	//Need to aggregate the number of reviews and average them
	//Need to figure out how ot give an array of images for the previewImage
	//probably need to make seed data for reviews
    //! Working on this part. Getting details for a single spot including images, reviews, and owner name and id. 

	res.json({
        currSpot,
        images,
        owner
             });
});

module.exports = router;
