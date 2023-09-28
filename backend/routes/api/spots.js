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
const { Spot, SpotImage, Review, User, sequelize, ReviewImage } = require("../../db/models");
const spot = require("../../db/models/spot");

const router = express.Router();

router.get("/", async (_req, res) => {
	// const allSpots = await Spot.findAll();

	// return res.json({
	// 	spots: allSpots,
	// });
		

		const yourSpots = await Spot.findAll({
			
			include: [
				{
					model: Review,
					attributes: ["stars"],
					// attributes: [
					// 	[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
					// ],
				},
				{
					model: SpotImage,
					attributes: ["url", "isPreview"],
				},
			],
		});

		let spotList = [];

		//console.log(yourSpots);

		yourSpots.forEach((spot) => {
			spotList.push(spot.toJSON());
		});

		if (spotList[0].Reviews) {
			for (let i = 0; i < spotList.length; i++) {
				const currSpot = spotList[i];
				let stars = 0;
				if (currSpot.Reviews) {
					for (let j = 0; j < currSpot.Reviews.length; j++) {
						const currReview = spotList[i].Reviews[j];
						stars += currReview.stars;
						//console.log(stars, "#######")
					}
					const avgRating = stars / currSpot.Reviews.length;
					//console.log(avgRating)
					if (!avgRating) {
						currSpot.avgRating = 0;
					} else currSpot.avgRating = avgRating;
					//console.log(currSpot)
					//spotList[i].avgStarRating = spotList[i].Reviews[i].avgRating;
				}

				delete spotList[i].Reviews;
				// delete spotList[i].avgRating;
			}
		}
		let imageList = [];

		for (let i = 0; i < spotList.length; i++) {
			const currSpot = spotList[i];
			for (let j = 0; j < currSpot.SpotImages.length; j++) {
				let currImg = currSpot.SpotImages[j];

				if (currImg.isPreview === true) {
					currSpot.previewImage = currImg.url;
				}
			}
			delete currSpot.SpotImages;
		}

		imageList.forEach((image) => {
			imageList.push(image.toJSON());
		});

		return res.json({ Spots: spotList });
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

		const newSpotId = newSpot.dataValues.id

		const returnSpot = await Spot.findByPk(newSpotId, {
			attributes: {
				exclude: ["avgRating"]
			}
		})
		
		console.log(returnSpot)	

		return res.json(returnSpot);
	} catch (error) {
		res.status(400);
		return res.json({
			message: "Bad Request",
			errors: error.errors[0].message,
		});
		
	}
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
	const spotId = req.params.spotId;
	const ownerId = req.user.id;
	const currSpot = await Spot.findByPk(spotId);
	const { url, preview } = req.body;

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
		isPreview: preview,
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
			ownerId: ownerId,
		},
		include: [
			{
				model: Review,
				attributes: ["stars"],
				// attributes: [
				// 	[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
				// ],
			},
			{
				model: SpotImage,
				attributes: ["url", "isPreview"]
			}
			
		],

		
	});

	let spotList = [];

	//console.log(yourSpots);

	yourSpots.forEach((spot) => {
		spotList.push(spot.toJSON());
	});

	if (spotList[0].Reviews) {
		for (let i = 0; i < spotList.length; i++) {
			const currSpot = spotList[i];
			let stars = 0;
			if (currSpot.Reviews) {
				for (let j = 0; j < currSpot.Reviews.length; j++) {
					const currReview = spotList[i].Reviews[j];
					stars += currReview.stars
					//console.log(stars, "#######")	
				}
				const avgRating = stars / currSpot.Reviews.length;
				//console.log(avgRating)
				if(!avgRating) {
					currSpot.avgRating = 0
				} else 
				currSpot.avgRating = avgRating
				//console.log(currSpot)
				//spotList[i].avgStarRating = spotList[i].Reviews[i].avgRating;
			}




			 delete spotList[i].Reviews;
			// delete spotList[i].avgRating;
		}
	}
	let imageList = [];

	for (let i = 0; i < spotList.length; i++) {
		const currSpot = spotList[i]
		for ( let j =0; j < currSpot.SpotImages.length; j ++) {
			let currImg = currSpot.SpotImages[j]

			if (currImg.isPreview === true) {
				currSpot.previewImage = currImg.url
			}
		}
	delete currSpot.SpotImages
	}

	imageList.forEach((image) => {
		imageList.push(image.toJSON());
	});


	return res.json({ Spots: spotList });
});

router.get("/:spotId", async (req, res) => {
	const  id  = req.params.spotId;

	const testIfExist = await Spot.findByPk(id);

	if (!testIfExist) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	const currSpot = await Spot.findAll({
		 group:  ['Spot.id', 'Reviews.id'] ,
		where: { id : id },

		include: [
			{
				model: Review,
				attributes: [
					[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
					[sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
				],
			},
		],
	});

	let spotList = [];

	currSpot.forEach((spot) => {
		spotList.push(spot.toJSON());
	});

	if (spotList[0].Reviews[0]) {
		spotList[0].numReviews = spotList[0].Reviews[0].numReviews;
		spotList[0].avgStarRating = spotList[0].Reviews[0].avgRating;
		delete spotList[0].Reviews;
		delete spotList[0].avgRating;
	}

	const images = await SpotImage.findAll({
		where: {
			id,
		},
	});

	let imageList = [];

	images.forEach((image) => {
		imageList.push(image.toJSON());
	});

	for (let i = 0; i < imageList.length; i++) {
		let currImg = imageList[i];

		delete currImg.spotId;
		if (currImg.isPreview === true) {
			spotList[0].previewImage = currImg.url;
		}
	}

	spotList[0].SpotImages = imageList;

	const owner = await User.findAll({
		where: {
			id: spotList[0].ownerId,
		},
	});

	const ownerList = [];

	owner.forEach((owner) => {
		ownerList.push(owner.toJSON());
	});

	for (let i = 0; i < ownerList.length; i++) {
		let currOwner = ownerList[i];

		delete currOwner.username;
	}

	spotList[0].Owner = ownerList;

	res.json(spotList);
});

router.put("/:spotId", requireAuth, async (req, res) => {
	const ownerId = req.user.id;
	const spotId = req.params.spotId;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	const spot = await Spot.findByPk(spotId, {
		attributes: {
			exclude: ["avgRating", "previewImage"],
		},
	});

	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	if (spot.ownerId !== ownerId) {
		res.status(403);
		return res.json({
			msg: "User not authorized to make changes to this spot",
		});
	}

	try {
		await spot.set({
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

		await spot.save();

		return res.json(spot);
	} catch (error) {
		res.status(400);
		return res.json({
			message: "Bad Request",
			errors: error.errors[0].message,
		});
	}
});

router.delete("/:spotId", requireAuth, async (req, res) => {
	const ownerId = req.user.id;
	const spotId = req.params.spotId;

	const spot = await Spot.findByPk(spotId, {
		attributes: {
			exclude: ["avgRating", "previewImage"],
		},
	});

	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot Couldn't be found",
		});
	}

	if (ownerId !== spot.ownerId) {
		res.status(403);
		return res.json({
			msg: "User not authorized to make changes to this spot",
		});
	}

	await spot.destroy();

	return res.json({
		message: "Successfully deleted",
	});
});

router.get("/:spotId/reviews", async (req, res) => {
	const { spotId } = req.params;

	const checkSpot = await Spot.findAll({
		where: {
			id: spotId
		}
	})

	//console.log(checkSpot)

	if (!checkSpot.length){
		res.status(404)
		return res.json({
			message: "Spot Couldn't be found"
		})
	}

	const yourReviews = await Review.findAll({
		where: {
			spotId,
		},

		include: [
			{
				model: User,
				attributes: {
					exclude: [
						"username",
						"email",
						"hashedPassword",
						"createdAt",
						"updatedAt",
					],
				},
			},
			{
				model: Spot,
				attributes: {
					exclude: ["description", "avgRating", "createdAt", "updatedAt"],
				},
			},
			// {
			// 	model: ReviewImage,
			// 	attributes: ["id", "url"],
			// },
		],
	});


	if(!yourReviews.length) {
		
		return res.json({
			message: "No Reviews Here Sorry :("
		})
	}

	let reviewsList = [];

	yourReviews.forEach((Review) => {
		reviewsList.push(Review.toJSON());
	});

	//console.log(reviewsList[0].Spot.id)

	for (let i = 0; i < reviewsList.length; i++) {
		let currReview = reviewsList[i];
		const id = currReview.Spot.id;
		const reviewId = currReview.id;
		const images = await SpotImage.findAll({
			where: {
				id,
			},
		});

		let imageList = [];

		images.forEach((image) => {
			imageList.push(image.toJSON());
		});
		const reviewImages = await ReviewImage.findAll({
			where: {
				reviewId,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "reviewId"],
			},
		});

		let reviewImageList = [];

		reviewImages.forEach((image) => {
			reviewImageList.push(image.toJSON());
		});

		currReview.ReviewImages = reviewImageList;
		for (let i = 0; i < imageList.length; i++) {
			let currImg = imageList[i];

			delete currImg.spotId;
			if (currImg.isPreview === true) {
				currReview.Spot.previewImage = currImg.url;
			}
			delete currReview.Spot;
		}
	}

	res.json({ Reviews: reviewsList });
});

const validateReview = [
	check("review")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Review text is required."),
	check("stars")
		.exists({ checkFalsy: true })
		.isInt({
			min: 1
		})
		.isInt({
			max: 5
		})
		.withMessage("Stars must be an integer from 1 to 5."),
	handleValidationErrors,
];

router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res) => {
	const { spotId } = req.params
	const { review, stars } = req.body
	const  user  = req.user.id

	const checkSpot = await Spot.findAll({
		where: {
			id: spotId
		},
		include : {
			model: Review
		}
	})

	if (!checkSpot.length) {
		res.status(404)
		return res.json({
			message: "Spot couldn't be found"
		})
	}

	const spotList = [];

	checkSpot.forEach(el => {
		spotList.push(el.toJSON())
	})

	//console.log(spotList[0].Reviews)

	for (let i = 0; i < spotList[0].Reviews.length; i++) {
		let currReview = spotList[0].Reviews[i]
		if (currReview.userId === user) {
			res.status(500)
			return res.json({
				message: "User already has a review for this spot"
			})
		}
	}


	const newReview = await Review.create({
		userId : user,
		spotId : parseInt(spotId),
		review,
		stars
})


	res.json(newReview)
})



module.exports = router;
