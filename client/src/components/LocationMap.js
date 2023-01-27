import React, { useState } from "react";
import Geocode from "react-geocode";

Geocode.setApiKey("********* your api key *********");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("de");

/*
location: {
  address: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  geo: {
    langitude: { type: String, required: true },
    latitude: { type: String, required: true },
  },
}

*/

const LocationMap = ({ onChange }) => {
  const [address, setAddress] = useState("");

  function getGeoLocation(event) {
    event.preventDefault();
    // Get latitude & longitude from address.
    Geocode.fromAddress(address).then(
      (response) => {
        console.log({ response });
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);

        const location = {
          address,
          // zip: result...
          // ...
          geo: {
            langitude: lng,
            latitude: lat,
          },
        };
        return onChange(location);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // useEffect(() => {
  //    getGeoLocation();
  // }, [address]);

  return (
    <>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={getGeoLocation}
      />
    </>
  );
};

export default LocationMap;
