import * as React from "react";
import RangeSlider from "../../components/RangeSlider";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const StayFilters = () => {
  const [location, setLocation] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([10, 100]);
  const [dateRange, setDateRange] = React.useState([new Date(), new Date()]);

  return (
    <div>
      <form>
        <div>
          <label>Where to you want to stay?</label>
          <input
            type="text"
            placeholder="Vienna"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="date-range">
          When do you plan to stay there?
          <DatePicker
            selectsRange={true}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(newDateRange) => {
              console.log(newDateRange);
              setDateRange(newDateRange);
            }}
            dateFormat="dd.MM.yyyy"
          />
        </div>
        <RangeSlider
          label="What's the stay worth to you?"
          value={priceRange}
          setValue={setPriceRange}
        />
      </form>
    </div>
  );
};

export default StayFilters;
