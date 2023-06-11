import * as React from "react";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TagOption, options } from "./options";

import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

const _filterOptions = createFilterOptions<TagOption>();
const filterOption = (props, state) => {
  const results = _filterOptions(props, state);

  return results.slice(0, 6);
};

function OptionItem({ option, ...other }) {
  return (
    <li
      {...other}
      style={{
        display: "block"
      }}
    >
      <div>
        <Chip label={option.tag} />
        </div>
    </li>
  );
}

export default function CheckboxesTags() {
  return (
    <Box sx={{ p: 3 }}>
      <Autocomplete
        multiple
        options={options}
        fullWidth
        ListboxProps={{
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 3,
            maxHeight: "initial"
          }
        }}
        disableCloseOnSelect
        filterOptions={filterOption}
        filterSelectedOptions
        isOptionEqualToValue={(option, value) => option.tag === value.tag}
        getOptionLabel={(option) => option.tag}
        renderOption={(props, option, { selected }) => (
          <OptionItem {...props} option={option} />
        )}
        renderInput={(params) => (
          <TextField {...params} label="Checkboxes" placeholder="Favorites" />
        )}
      />
    </Box>
  );
}
