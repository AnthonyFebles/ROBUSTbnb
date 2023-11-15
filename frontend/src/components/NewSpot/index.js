import "./NewSpot.css";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewSpot } from "../../store/spots";
import { addImage } from "../../store/images";
import { getSpots } from "../../store/spots";

const NewSpot = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [country, setCountry] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [previewImg, setPreviewImg] = useState("");
	const [imageOne, setImageOne] = useState("");
	const [imageTwo, setImageTwo] = useState("");
	const [imageThree, setImageThree] = useState("");
	const [imageFour, setImageFour] = useState("");
	const [errors, setErrors] = useState({});
	const [imgErrors, setImageErrors] = useState({});
	const [createClick, setCreateClick] = useState(false);

	useEffect(() => {
		dispatch(getSpots());
	}, [dispatch]);

	const spots = useSelector((state) => {
		return state.spots.list;
	});

	const spotId = spots.length + 1;

	//console.log(spots, "spots");

	const payload = {
		address,
		city,
		country,
		description,
		lat,
		lng,
		name: title,
		price,
		state,
	};

	const imgPayload = [previewImg, imageOne, imageTwo, imageThree, imageFour];

	for (let i = 0; i < imgPayload.length; i++) {
		let currImg = imgPayload[i];
		imgPayload[i] = { url: currImg, spotId: spotId, preview: false };
		imgPayload[0].preview = true;

		//console.log(imgPayload);
	}

	//png, .jpg, or .jpeg

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		setCreateClick(true);

		return dispatch(createNewSpot(payload)).then(
			() => {
				return imgPayload.forEach((el, idx, arr) => {
					dispatch(addImage(spotId, el)).then(
						() => {
							return history.push(`/spots/${spotId}`);
						},
						async (res) => {
							const data = await res.json();
							if (data) {
								//console.log(data, "imgErrordata");
								if (data.message) {
									setErrors({ message: data.message });
									alert(data.message);
								}
								if (data.errors) {
									const derrors = data.errors;
									console.log(derrors, "img errors");
								}
							}
						}
					);
				});
			},
			async (res) => {
				const data = await res.json();
				if (previewImg.length === 0) {
					//console.log(previewImg.length, "img preview");

					setErrors({
						preview: "Preview image is required",
					});
					//console.log(errors.preview);
				}

				if (data) {
					if (data.message) {
						setErrors({ message: data.message });
						alert(data.message);
					}
					if (data.errors instanceof Object) {
						const derrors = data.errors;
						//(derrors, "form errors");
						if (derrors) {
							setErrors({
								...errors,
								address: derrors.address,
								city: derrors.city,
								country: derrors.country,
								description: derrors.description,
								name: derrors.name,
								price: derrors.price,
								state: derrors.state,
								lat: derrors.lat,
								lng: derrors.lng,
							});
						}
					}

					if (typeof data.errors === typeof "string") {
						alert(data.errors);
					}
				}
			}
		);
	};

	const handleDisable = (preview, img1, img2, img3, img4) => {
		if (preview.length > 1) {
			if (
				preview.toString().endsWith(".png") ||
				preview.toString().endsWith(".jpg") ||
				preview.toString().endsWith(".jpeg")
			) {
				return false;
			}
		}

		return true;
	};

	return (
		<>
			<div className="headers">
				<h1>Create a new Spot</h1>
				<h2>Where's your place located?</h2>
				<p>
					Guests will only get your exact address once the booked a reservation.
				</p>
			</div>
			<form className="newSpotForm" onSubmit={handleSubmit}>
				<div className="location-form">
					{errors.country && <p className="rr">{errors.country}</p>}
					<label>
						Country
						<input
							placeholder="Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						></input>
					</label>
					{errors.address && <p className="rr">{errors.address}</p>}
					<label>
						Street Address
						<input
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></input>
					</label>

					<span className="cityState-form">
						{errors.city && <p className="rr">{errors.city}</p>}
						<label>
							City
							<input
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							></input>
							,
						</label>

						{errors.state && <p className="rr">{errors.state}</p>}
						<label>
							State
							<input
								placeholder="State"
								value={state}
								onChange={(e) => setState(e.target.value)}
							></input>
						</label>
					</span>
					<span className="latLong-form">
						{errors.lat && <p className="rr">{errors.lat}</p>}
						<label>
							Latitude
							<input
								placeholder="Latitude"
								value={lat}
								onChange={(e) => setLat(e.target.value)}
							></input>
							,
						</label>

						{errors.lng && <p className="rr">{errors.lng}</p>}
						<label>
							Longitude
							<input
								placeholder="Longitude"
								value={lng}
								onChange={(e) => setLng(e.target.value)}
							></input>
						</label>
					</span>
				</div>

				<div className="description-form">
					<div className="description-headers">
						<h2>Describe your place to guests</h2>
						<p>
							Mention the best features of your space, any special amenities
							like fast wifi, or parking, and what you love about the
							neighborhood.
						</p>
					</div>
					{errors.description && <p className="rr">{errors.description}</p>}
					<textarea
						className="descriptionText-form"
						rows={10}
						placeholder="Please write at least 30 characters"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>

				<div className="title-form">
					<div className="title-headers">
						<h2>Create a title for you spot</h2>
						<p>
							Catch guests' attention with a spot title that highlights what
							makes your place special.
						</p>
						{errors.name && <p className="rr">{errors.name}</p>}
						<input
							placeholder="Name of your spot"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></input>
					</div>
				</div>

				<div className="price-form">
					<div className="price-headers">
						<h2>Set a base price for your spot</h2>
						<p>
							Competitive pricing can help your listing stand out and rank
							higher in search results.
						</p>
					</div>
					{errors.price && <p className="rr">{errors.price}</p>}
					<span className="dollar-sign">$
						<input
							placeholder="Price per night(USD)"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						></input>
					</span>
				</div>

				<div className="photos-form">
					<div className="photos-headers">
						<h2>Liven up your spot with photos</h2>
						<p>Submit a link to at least one photo to publish your spot.</p>
					</div>

					<input
						placeholder="Preview image URL"
						value={previewImg}
						onChange={(e) => setPreviewImg(e.target.value)}
					></input>
					{createClick ? (
						handleDisable(previewImg) ? (
							<p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
						) : (
							<p></p>
						)
					) : (
						<p></p>
					)}

					<input
						placeholder="Image URL"
						value={imageOne}
						onChange={(e) => setImageOne(e.target.value)}
					></input>
					{createClick ? (
						handleDisable(imageOne) ? (
							<p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
						) : (
							<p></p>
						)
					) : (
						<p></p>
					)}

					<input
						placeholder="Image URL"
						value={imageTwo}
						onChange={(e) => setImageTwo(e.target.value)}
					></input>
					{createClick ? (
						handleDisable(imageTwo) ? (
							<p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
						) : (
							<p></p>
						)
					) : (
						<p></p>
					)}

					<input
						placeholder="Image URL"
						value={imageThree}
						onChange={(e) => setImageThree(e.target.value)}
					></input>
					{createClick ? (
						handleDisable(imageThree) ? (
							<p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
						) : (
							<p></p>
						)
					) : (
						<p></p>
					)}

					<input
						placeholder="Image URL"
						value={imageFour}
						onChange={(e) => setImageFour(e.target.value)}
					></input>
					{createClick ? (
						handleDisable(imageFour) ? (
							<p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
						) : (
							<p></p>
						)
					) : (
						<p></p>
					)}
				</div>

				<div className="submitButton-form">
					<button
						className="createSpotButton-form"
						disabled={handleDisable(
							previewImg,
							imageOne,
							imageTwo,
							imageThree,
							imageFour
						)}
					>
						Create a spot
					</button>
				</div>
			</form>
		</>
	);
};

export default NewSpot;
