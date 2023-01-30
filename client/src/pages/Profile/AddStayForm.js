import { useState } from "react";
import { apiBaseUrl } from "../../api";
// import LocationMap from "../../components/LocationMap";

const AddStayForm = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(25);
  const [location, setLocation] = useState("");
  const [highlights, setHighlights] = useState({
    maxGuests: 10,
    rooms: 4,
    bathrooms: 2,
    wifi: true,
    kitchen: true,
    airconditioner: true,
  });
  const [pictures, setPictures] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function offerStay(event) {
    event.preventDefault();

    fetch(`${apiBaseUrl}/stays`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
        location,
        highlights,
        pictures,
      }),
    })
      .then((res) => res.json())
      .then(({ status, result, error }) => {
        if (status === "error") {
          // error handling...
          console.log(error);
          setErrorMessage(error.message);
          return;
        }
        console.log(result);
        // setToken(result.accessToken);
        // return navigate("/dashboard");
      });
  }

  return (
    <form id="add-stay-form">
      <h2>Offer your Stay</h2>
      <div class="input-pairs">
        <label for="title-input">Title</label>
        <input
          id="title-slider"
          type="text"
          placeholder="Ultra preeeemium deluxe appartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label for="description-input">Description</label>
        <input
          id="description-slider"
          type="description"
          placeholder="Ultra ultra preeeemium deluxe"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label for="price-slider">Price per Night</label>
        <div class="slider-box">
          {price}
          <input
            id="price-slider"
            type="range"
            min={20}
            max={200}
            placeholder="60"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <label for="maxGuests-slider">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* <LocationMap onChange={(location) => setLocation(location)} /> */}

        <label for="maxGuests-slider">Maximum Guests</label>
        <div class="slider-box">
          {highlights.maxGuests}
          <input
            id="maxGuests-slider"
            type="range"
            min={1}
            max={12}
            value={highlights.maxGuests}
            onChange={(e) =>
              setHighlights({
                ...highlights,
                maxGuests: Number(e.target.value),
              })
            }
          />
        </div>

        <label for="rooms-slider">Rooms</label>
        <div class="slider-box">
          {highlights.rooms}
          <input
            id="rooms-slider"
            type="range"
            min={1}
            max={8}
            value={highlights.rooms}
            onChange={(e) =>
              setHighlights({ ...highlights, rooms: Number(e.target.value) })
            }
          />
        </div>

        <label for="bathrooms-slider">Bathrooms</label>
        <div class="slider-box">
          {highlights.bathrooms}
          <input
            id="bathrooms-slider"
            type="range"
            min={1}
            max={3}
            value={highlights.bathrooms}
            onChange={(e) =>
              setHighlights({
                ...highlights,
                bathrooms: Number(e.target.value),
              })
            }
          />
        </div>

        <label for="wifi-checkbox">Wi-Fi</label>
        <input
          type="checkbox"
          id="wifi-checkbox"
          checked={highlights.wifi}
          onChange={(e) =>
            setHighlights({ ...highlights, wifi: e.target.checked })
          }
        />

        <label for="kitchen-checkbox">Kitchen</label>
        <input
          type="checkbox"
          id="kitchen-checkbox"
          checked={highlights.kitchen}
          onChange={(e) =>
            setHighlights({ ...highlights, kitchen: e.target.checked })
          }
        />

        <label for="airconditioner-checkbox">Airconditioner</label>
        <input
          type="checkbox"
          id="airconditioner-checkbox"
          checked={highlights.airconditioner}
          onChange={(e) => {
            console.log(e);
            setHighlights({
              ...highlights,
              airconditioner: e.target.checked,
            });
          }}
        />
      </div>
      <button onClick={offerStay}>Offer Stay</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default AddStayForm;
