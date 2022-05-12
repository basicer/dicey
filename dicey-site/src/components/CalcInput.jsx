import React from "react";
import { Alert, TextField, Card, CardContent, CardActions } from "../material";
import { useRecoilState, useRecoilValue } from "recoil";
import { makeStyles } from "@material-ui/core/styles";

import * as state from "../state";

const useStyles = makeStyles((theme) => ({
  textbox: {
    "& textarea": {
      fontFamily: "monospace",
    },
  },
  card: {
    paddingBottom: 0,
  },
}));

export default function CalcInput() {
  const classes = useStyles();
  const [expression, setExpression] = useRecoilState(state.query);
  const error = useRecoilValue(state.errors);

  return (
    <Card>
      <CardContent className={classes.card}>
        <TextField
          className={classes.textbox}
          id="outlined-multiline-static"
          label="Input"
          multiline
          maxRows={6}
          fullWidth
          value={expression}
          error={!!error}
          onChange={(e) => setExpression(e.target.value)}
          variant="outlined"
        />
      </CardContent>
      <CardActions>
        {error ? <Alert severity="error">{error}</Alert> : null}
      </CardActions>
    </Card>
  );
}
