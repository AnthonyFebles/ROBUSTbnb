const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require("../../utils/auth");
const { Spot, SpotImage, Review, User, sequelize, ReviewImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
    const userId = req.user.id

    const yourReviews = await Review.findAll({
			where: {
				userId,
			},

			include: [
				{
					model: User,
					attributes: {
						exclude: ["username", "email", "hashedPassword", "createdAt", "updatedAt"],
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

        let reviewsList = []

        yourReviews.forEach(Review => {
            reviewsList.push(Review.toJSON())
        });

        //console.log(reviewsList[0].Spot.id)
    

        for (let i = 0; i < reviewsList.length; i++){
            let currReview = reviewsList[i]
            const id = currReview.Spot.id
            const reviewId = currReview.id
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
                    reviewId
                },
                attributes : {
                    exclude:["createdAt", "updatedAt", "reviewId"]
                }
            })

            let reviewImageList = [];

            reviewImages.forEach((image) => {
                reviewImageList.push(image.toJSON())
            });

            

                        currReview.ReviewImages = reviewImageList
            for (let i = 0; i < imageList.length; i++) {
		        let currImg = imageList[i];

		        delete currImg.spotId;
		    if (currImg.isPreview === true) {
			    currReview.Spot.previewImage = currImg.url;
		        }
	}            
        }









    res.json({Reviews: reviewsList})
})














module.exports = router;