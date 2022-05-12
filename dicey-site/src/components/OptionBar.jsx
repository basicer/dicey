import React from "react";
import {
  Switch,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
} from "../material";

import { useRecoilState } from "recoil";

import * as state from "../state";

export default function OptionBar() {
  const [collapse, setCollapse] = useRecoilState(state.collapse);
  const [transpose, setTranspose] = useRecoilState(state.transpose);
  const [mode, setMode] = useRecoilState(state.mode);

  let select = (
    <RadioGroup
      row
      aria-label="position"
      name="position"
      defaultValue="normal"
      onChange={(e, v) => setMode(v)}
    >
      <FormControlLabel
        value="normal"
        control={<Radio color="primary" />}
        label="Normal"
      />
      <FormControlLabel
        value="atleast"
        control={<Radio color="primary" />}
        label="At Least"
      />
      <FormControlLabel
        value="atmost"
        control={<Radio color="primary" />}
        label="At Most"
      />
    </RadioGroup>
  );

  void select;

  return (
    <>
      <FormControl variant="standard">
        <Select value={mode} onChange={(e) => setMode(e.target.value)}>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="atleast">At Least</MenuItem>
          <MenuItem value="atmost">At Most</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={collapse}
            onChange={(e) => setCollapse(e.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Collapse"
      />

      <FormControlLabel
        control={
          <Switch
            checked={transpose}
            onChange={(e) => setTranspose(e.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Transpose"
      />
    </>
  );
}
