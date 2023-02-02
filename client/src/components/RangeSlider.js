import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value) {
  return `EUR ${value}`;
}

export default function RangeSlider({ label, value, setValue }) {
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography>
        {label}: From {value[0]} to {value[1]}
      </Typography>
      <Slider
        getAriaLabel={() => label}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={200}
      />
    </Box>
  );
}
