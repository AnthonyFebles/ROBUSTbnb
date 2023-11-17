import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ReviewForm.css";
import { useModal } from "../../context/Modal";
import { postReview } from "../../store/reviews";

const ReviewFormModal = ({ spotId }) => {
	const dispatch = useDispatch();
	const [reviewText, setReviewText] = useState("");
	const [stars, setStars] = useState(0);
	const [errors, setErrors] = useState({});
	const history = useHistory();
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		const payload = {
			review: reviewText,
			stars,
		};
		e.preventDefault();
		setErrors({});

		let createdReview = await dispatch(postReview(spotId, payload)).catch(
			async (res) => {
				const data = await res.json();
				//console.log(data);
				//console.log(data.errors);
				if (data && data.message) setErrors({ message: data.message });
				//console.log(data)
				alert(data.message);
			}
		);

		if (createdReview) {
			closeModal();
		}
		return history.push(`/spots/${spotId}`);
	};

	const handleDisabled = (review, stars) => {
		if (review.length < 10 || stars < 1) {
			return true;
		}

		return false;
	};

	const handleStars = (num) => {
		return setStars(num);
	};

	return (
		<>
			{errors && <p>{errors.message}</p>}
			<h1>How was your stay?</h1>
			<form className="review-form" onSubmit={handleSubmit}>
				<label className="review-textarea">
					<textarea
						className="review-textarea"
						rows="6"
						placeholder="Leave your review here..."
						value={reviewText}
						onChange={(e) => setReviewText(e.target.value)}
						required
					/>
				</label>
				<label className="stars">
					<span
						className={stars >= 1 ? "filled" : "empty"}
						onClick={() => handleStars(1)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars >= 2 ? "filled" : "empty"}
						onClick={() => handleStars(2)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars >= 3 ? "filled" : "empty"}
						onClick={() => handleStars(3)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars >= 4 ? "filled" : "empty"}
						onClick={() => handleStars(4)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					<span
						className={stars === 5 ? "filled" : "empty"}
						onClick={() => handleStars(5)}
					>
						<i className="fa-solid fa-star"></i>
					</span>
					Stars
				</label>

				<button
					className="review-button"
					type="submit"
					disabled={handleDisabled(reviewText, stars)}
				>
					Submit Your Review
				</button>
			</form>
		</>
	);
};

export default ReviewFormModal;
