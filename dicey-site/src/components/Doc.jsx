import React, { useEffect, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Paper,
  Link,
  Typography,
  Backdrop,
  CircularProgress,
  Button,
} from "../material";

import Markdown from "markdown-to-jsx";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  doc: { padding: theme.spacing(2) },
  h1: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(1) },
  h2: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(1) },
  h3: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(1) },
  h4: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(1) },
  h5: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(1) },
  h6: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(1) },
  p: { paddingBottom: theme.spacing(2) },
  code: {
    display: "inline",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5),
  },
  example: {
    fontFamily: "monospace",
    whiteSpace: "pre",
    textTransform: "none",
  },
}));

export function Example({ children }) {
  const classes = useStyles();
  let uri = `/?input=${encodeURIComponent(children ? children[0] : "")}`;

  return (
    <Button
      component={RouterLink}
      size="small"
      to={uri}
      color="primary"
      variant="contained"
      className={classes.example}
    >
      {children}
    </Button>
  );
}

export default function Docs({ page }) {
  const classes = useStyles();
  const [markdown, setMarkdown] = useState(null);

  useEffect(
    () =>
      (async () => {
        try {
          let url = await import(`../docs/${page}.md`);
          let data = await fetch(url.default);
          setMarkdown(await data.text());
        } catch (e) {
          setMarkdown(false);
        }
      })(),
    [page]
  );

  let options = {
    overrides: {
      h1: {
        component: Typography,
        props: { variant: "h3", className: classes.h1 },
      },
      h2: {
        component: Typography,
        props: { variant: "h4", className: classes.h2 },
      },
      h3: {
        component: Typography,
        props: { variant: "h5", className: classes.h3 },
      },
      h4: {
        component: Typography,
        props: { variant: "h6", className: classes.h4 },
      },
      p: {
        component: Typography,
        props: { variant: "body1", className: classes.p },
      },
      a: { component: Link },
      li: { component: Typography, props: { component: "li" } },
      code: { component: "code", props: { className: classes.code } },
      kbd: { component: Example },
    },
  };

  return (
    <>
      <Paper className={classes.doc}>
        {typeof markdown == "string" && (
          <Markdown options={options}>{markdown}</Markdown>
        )}
        {markdown === null && (
          <Backdrop className={classes.backdrop}>
            <CircularProgress size="200px" />
          </Backdrop>
        )}
        {markdown === false && <h1>404</h1>}
      </Paper>
      <br />
      <div className={classes.muted}>
        {process.env.REACT_APP_GIT_SHA || "-"}
      </div>
    </>
  );
}
