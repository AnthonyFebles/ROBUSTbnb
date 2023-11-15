import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../../store/spot";
import { getReviews } from "../../store/reviews";
import "./SpotDetails.css";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal";

const SpotDetails = () => {
	const dispatch = useDispatch();

	let { spotId } = useParams();
	//console.log(spotId, 'spotId use params')
	//console.log(useParams())

	const [avgStars, setAvgStars] = useState(0);

	useEffect(() => {
		dispatch(getOne(spotId));
		dispatch(getReviews(spotId));
	}, [dispatch, ReviewFormModal]);

	useEffect(() => {
		let final = 0;
		let total = 0;
		for (let i = 0; i < Reviews.length; i++) {
			const currReview = Reviews[i];
			total += currReview.stars;
			////console.log(currReview)
		}

		if (total > 0) {
			final = parseFloat(total / Reviews.length).toFixed(2);
		}
		////console.log(final, 'total', total)
		setAvgStars(final);
	});

	////console.log(owner, "owner");

	const Spot = useSelector((state) => {
		return state.spot;
	});

	const user = useSelector((state) => {
		//console.log(state.session, "session slice of state aka user variable")
		return state.session.user;
	});
	// useEffect(() => {
	//     setReviews(Reviews)
	//     //console.log(reviews, "reviews")
	// }, [Spot] )

	const Reviews = useSelector((state) => {
		//console.log(state, "entire state in side Reviews");
		if (state.reviews.list.message) {
			return [];
		}
		return state.reviews.list.map((spotId) => state.reviews[spotId]);
	});

	if (Reviews) {
		for (let i = 0; i < Reviews.length; i++) {
			let currReview = Reviews[i];
			if (currReview === undefined) {
				let deadArr = Reviews.splice(i, 1);
			}
		}
	}

	//console.log(Reviews, "Reviews");

	////console.log(Spot, "spot")

	if (!Reviews.length) {
		////console.log("no reviews");
	}

	let content = null;

	let numReviews = null;

	const reviewDate = (element) => {
		const arr = element.split("-");
		const year = arr[0];
		const month = arr[1];

		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const longMonth = monthNames[month - 1];

		const date = `${longMonth} ${year}`;
		return date;
	};
	if (Reviews[0]) {
		//console.log(reviewDate(Reviews[0].createdAt))
	}
	if (Reviews.length === 1) {
		numReviews = <b>{Reviews.length} review</b>;
	}

	if (Reviews.length > 1) {
		numReviews = <b>{Reviews.length} reviews</b>;
	}

	let owner;

	if (Spot.Owner) {
		owner = Spot.Owner[0];
	}
	let isOwner = false;
	if (user && Spot.Owner) {
		//console.log(user.id, "user");
		const isOwnerFunc = () => {
			if (user.id === Spot.Owner[0].id) {
				return true;
			} else return false;
		};
		isOwner = isOwnerFunc();
	}

	let hasReview = false;

	const hasReviewFunc = () => {
		if (Reviews.length) {
			for (let i = 0; i < Reviews.length; i++) {
				let currReview = Reviews[i];
				//console.log(currReview, "currReview");
				if (user) {
					if (currReview) {
						if (user.id === currReview.userId) {
							//console.log("you have a review");
							return true;
						}
					}
				}
			}
		}
		return false;
	};

	hasReview = hasReviewFunc();

	////console.log(Spot.Owner[0].id, "owner")

	content = (
		<div className="Spot-detail-lists">
			<div>
				<h1 id="spotName">{Spot.name}</h1>
				<h2 id="spotLocation">
					{Spot.city}, {Spot.state}, {Spot.country}
				</h2>
				<div className="image-container">
					<img
						className="previewImg"
						src="https://variety.com/wp-content/uploads/2022/01/03_c-Joshua-White-JWPictures_2081.jpg"
						alt="preview"
					></img>
					<img
						src="https://variety.com/wp-content/uploads/2022/01/03_c-Joshua-White-JWPictures_2081.jpg"
						id="prev1"
						alt="small-img"
					></img>
					<img
						src="https://variety.com/wp-content/uploads/2022/01/03_c-Joshua-White-JWPictures_2081.jpg"
						id="prev2"
						alt="small-img2"
					></img>
					<img
						src="https://variety.com/wp-content/uploads/2022/01/03_c-Joshua-White-JWPictures_2081.jpg"
						id="prev3"
						alt="small-img3"
					></img>
					<img
						src="https://variety.com/wp-content/uploads/2022/01/03_c-Joshua-White-JWPictures_2081.jpg"
						id="prev4"
						alt="small-img4"
					></img>
				</div>
				<div className="under-images">
					<div id="hosted-by">
						<h2>
							<b>Hosted by </b>
							{"  "}
							{owner === undefined ? "Loading" : owner.firstName}{" "}
							{owner === undefined ? "Loading" : owner.lastName}
						</h2>
						<br></br>
						<p>
							<b>{Spot.description}</b>
						</p>

						<br></br>
					</div>
					<span className="reservation-area">
						<b id="price">${Spot.price}</b> night
						<i className="fa-solid fa-star"></i>
						{avgStars === 0 || !avgStars ? "New" : `${avgStars} ·`}
						<span className="center-dot"></span>
						{numReviews}
						<div>
							<button
								className="reserve-button"
								onClick={() => alert("Feature coming soon")}
							>
								Reserve
							</button>
						</div>
					</span>
				</div>

				<div className="reviews-header">
					<h2>
						<i className="fa-solid fa-star"></i>
						{avgStars === 0 || !avgStars ? "New " : `${avgStars} ·`}
						{numReviews}
						<div className="post-review-button">
							{user && !hasReview && !isOwner ? (
								<OpenModalButton
									buttonText="Post Your Review"
									modalComponent={<ReviewFormModal spotId={spotId} />}
								/>
							) : (
								<span></span>
							)}
						</div>
						<span className="center-dot"></span>
					</h2>
				</div>
				<div className="reviews-container">
					{Reviews.length !== 0 ? (
						Reviews.toReversed().map((element) => {
							return (
								<div className="reviews">
									{" "}
									<div className="reviewer-name">
										<b>{element.User.firstName}</b>
									</div>
									<div className="review-date">
										{reviewDate(element.createdAt)}
									</div>
									<div className="review">
										{element.review}
										{element && user ? (
											element.userId === user.id ? (
												<div>
													<OpenModalButton
														className="delete-review-button"
														buttonText="Delete"
														modalComponent={
															<DeleteReviewModal reviewId={element.id} />
														}
													/>
												</div>
											) : (
												<></>
											)
										) : (
											<></>
										)}
									</div>
								</div>
							);
						})
					) : (
						<>
							<span className="reviews-header">
								Be the first to leave a review!
							</span>{" "}
						</>
					)}
				</div>
			</div>
		</div>
	);

	return <body className="spot-detail">{content}</body>;
};

export default SpotDetails;
