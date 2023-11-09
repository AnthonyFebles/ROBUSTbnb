import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOne } from "../../store/spot";
import { getReviews } from "../../store/reviews";


const SpotDetails = () => {
	const dispatch = useDispatch();

	let { spotId } = useParams();

	const [owner, setOwner] = useState("");
	const [avgStars, setAvgStars] = useState(0);

	useEffect(() => {
		dispatch(getOne(spotId));
		dispatch(getReviews(spotId));
	}, [dispatch]);



	useEffect(() => {
		let final = 0;
		let total = 0;
		for (let i = 0; i < Reviews.length; i++) {
			const currReview = Reviews[i];
			total += currReview.stars;
			//console.log(currReview)
		}

		if (total > 0) {
			final = parseFloat(total / Reviews.length).toFixed(2);
		}
		//console.log(final, 'total', total)
		setAvgStars(final);
	});

	//console.log(owner, "owner");

	const Spot = useSelector((state) => {
		return state.spot
	});
	// useEffect(() => {
	//     setReviews(Reviews)
	//     console.log(reviews, "reviews")
	// }, [Spot] )

	const Reviews = useSelector((state) => {
		console.log(state, "entire state in side Reviews");
        if(state.reviews.list.message) {
            return []
        }
		return state.reviews.list.map((spotId) => state.reviews[spotId]);
	});

	console.log(Reviews, "Reviews");

    //console.log(Spot, "spot")
	

	if (!Reviews.length) {
		//console.log("no reviews");
	}

	let content = null;

	let numReviews = null;

    const reviewDate = (element) => {
        const arr = element.split('-')
        const year = arr[0]
        const month = arr[1]

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
        const longMonth = monthNames[month -1]

        const date = `${longMonth} ${year}`
        return date
    
    }
if(Reviews[0]) {
    console.log(reviewDate(Reviews[0].createdAt))
}
	if (Reviews.length === 1) {
		numReviews = (
			<li>
				<b>{Reviews.length} Review</b>
			</li>
		);
	}

	if (Reviews.length > 1) {
		numReviews = (
			<li>
				<b>{Reviews.length} Reviews</b>
			</li>
		);
	}

	content = (
		<div className="Spot-detail-lists">
			<div>
				<h2>Information</h2>
				<ul>
					<li>
						<b>Name</b> {Spot.name}
					</li>
					<li>
						<b>Location</b> {Spot.city} {Spot.state} {Spot.country}
					</li>
					<li>
						<b>Hosted By</b> {owner === "" ? "Loading" : owner.firstName}{" "}
						{owner === "" ? "Loading" : owner.lastName}
					</li>
					<li>
						<b>Description</b> {Spot.description}
					</li>
					<li>
						<b>Price</b> ${Spot.price} Night
					</li>
					<li></li>
					{numReviews}
					<li>
						<b>Average Rating</b>
						<i className="fa-solid fa-star"></i>
						{avgStars === 0 || !avgStars ? "New" : `${avgStars}`}
					</li>
				</ul>
				{Reviews.length !== 0 ? (
					Reviews.map((element) => {
						return (
							<ul key={`${element.id}`}>
								<li>
									{" "}
									<b>Review</b> {element.review}
                                    <span>{element.User.firstName} {reviewDate(element.createdAt)}</span>
								</li>
							</ul>
						);
					})
				) : (
					<>
						<span>Be the first to leave a review!</span> <textarea></textarea>
					</>
				)}
			</div>
			<div>
				<button onClick={() => alert("Feature coming soon")}>Reserve</button>
			</div>
		</div>
	);

	return (
		<div className="Spot-detail">
			<div className={`Spot-detail-image-background`}>
				<div
					className="Spot-detail-image"
					style={{ backgroundImage: `url('')` }}
				></div>
				<div></div>
			</div>
			{content}
		</div>
	);
};

export default SpotDetails;
