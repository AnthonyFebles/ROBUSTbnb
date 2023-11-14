import "./UpdateSpot.css";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewSpot } from "../../store/spots";
import { addImage } from "../../store/images";
import { getSpots } from "../../store/spots";
import { getOne, updateSpot } from "../../store/spot";

const UpdateSpot = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { spotId } = useParams();
    console.log(spotId, 'spotid')

	useEffect(() => {
		dispatch(getOne(spotId));
	}, [dispatch]);

	const currSpot = useSelector((state) => {
		return state.spot;
	});

	console.log(currSpot, "currSpot");

	let currImg1;
	let currImg2;
	let currImg3;
	let currImg4;

	if (currSpot.SpotImages) {
		if (currSpot.SpotImages[1]) {
			currImg1 = currSpot.SpotImages[1].url;
		}
		if (currSpot.SpotImages[2]) {
			currImg2 = currSpot.SpotImages[2].url;
		}
		if (currSpot.SpotImages[3]) {
			currImg3 = currSpot.SpotImages[3].url;
		}
		if (currSpot.SpotImages[4]) {
			currImg4 = currSpot.SpotImages[4].url;
		}
	}

	const [country, setCountry] = useState(currSpot.country);
	const [address, setAddress] = useState(currSpot.address);
	const [city, setCity] = useState(currSpot.city);
	const [state, setState] = useState(currSpot.state);
	const [lat, setLat] = useState(currSpot.lat);
	const [lng, setLng] = useState(currSpot.lng);
	const [description, setDescription] = useState(currSpot.description);
	const [title, setTitle] = useState(currSpot.name);
	const [price, setPrice] = useState(currSpot.price);
	const [previewImg, setPreviewImg] = useState(currSpot.previewImage);
	const [imageOne, setImageOne] = useState(currImg1 || "");
	const [imageTwo, setImageTwo] = useState(currImg2 || "");
	const [imageThree, setImageThree] = useState(currImg3 || "");
	const [imageFour, setImageFour] = useState(currImg4 || "");
	const [errors, setErrors] = useState({});
	const [imgErrors, setImageErrors] = useState({});
	const [createClick, setCreateClick] = useState(false);

	const spots = useSelector((state) => {
		return state.spots.list;
	});

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

    const handleDisable = (array) => {
	
        let res; 
    
        for(let i =0; i <array.length; i ++) {
        let currImg = array[i]

        if (currImg.url) {
            if (
					currImg.url.toString().endsWith(".png") ||
					currImg.url.toString().endsWith(".jpg") ||
					currImg.url.toString().endsWith(".jpeg")
				) {
                  //console.log(currImg.url, "currimg pass");
                   res = false 
                } else {
                    //console.log(currImg.url, 'failed img')
                    res = true
                    break
                    
                }
    }}


     return res
	};

	//png, .jpg, or .jpeg

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		setCreateClick(true);

		return dispatch(updateSpot(payload, spotId)).then(
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
									//console.log(derrors, "img errors");
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
						//console.log(derrors, "form errors");
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

	return (
		<>
			<div className="headers">
				<h1>Update your Spot</h1>
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
					$ {errors.price && <p className="rr">{errors.price}</p>}
					<input
						placeholder="Price per night(USD)"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					></input>
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
						handleDisable([imageOne]) ? (
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
						handleDisable([imageTwo]) ? (
							<p className="rr">Image URL must end in .png, .jpg, or .jpeg</p>
						) : (
							<p></p>
						)
					) : (
						<p></p>
					)}

					<input
						placeholder="Image URL"
						value={[imageThree]}
						onChange={(e) => setImageThree(e.target.value)}
					></input>
					{createClick ? (
						handleDisable([imageThree]) ? (
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
						handleDisable([imageFour]) ? (
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
						disabled={handleDisable(imgPayload)}
					>
						Update Spot
					</button>
				</div>
			</form>
		</>
	);
};

export default UpdateSpot;
