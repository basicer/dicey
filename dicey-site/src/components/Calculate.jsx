import React, { useState, useEffect, Suspense } from "react";
import {
  Alert,
  Paper,
  TextField,
  AppBar,
  Tabs,
  Tab,
  Box,
  Button,
  Toolbar,
  Typography,
  Card,
  CardActions,
} from "../material";
import { useLocation } from "react-router-dom";
import Chart from "./Chart";
import { makeStyles } from "@material-ui/core/styles";
import { debug } from "dicey.js";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilStateLoadable,
  useSetRecoilState,
} from "recoil";

import CalcInput from "./CalcInput";
import CalcTable from "./CalcTable";
import OptionBar from "./OptionBar";

import * as state from "../state";

function rollOn(l) {
  let acc = 100 * Math.random();
  for (let v of l) {
    acc -= parseFloat(v.uv);
    if (acc <= 0) return String(v.name);
  }
  return "?";
}

class SilentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div>Error</div>
          <pre>${this.state.error.toString()}</pre>
        </>
      );
    }

    return this.props.children;
  }
}

const useStyles = makeStyles((theme) => ({
  doc: { padding: theme.spacing(2) },
  chart: {
    height: "calc(100vh - 350px)",
    minHeight: 300,
    "& div": { height: "100%" },
  },
  pre: { whiteSpace: "nowrap" },
  paper: { position: "relative" },
  freshness: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    zIndex: 10000,
    opacity: 0.5,
  },
  textbox: {
    "& textarea": {
      fontFamily: "monospace",
    },
  },
  bar: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SampleCacher() {
  const reload = useRecoilValue(state.reload);
  const [sample, setSample] = useRecoilState(state.sample);
  const setFresh = useSetRecoilState(state.fresh);
  const setSampleError = useSetRecoilState(state.sampleError);
  const [activeSample] = useRecoilStateLoadable(state.activeSample);
  useEffect(() => {
    if (activeSample.state === "hasError") {
      setFresh(false);
      setSampleError(activeSample.contents.message);
      return;
    }
    if (activeSample.state !== "hasValue") {
      setFresh(false);
      setSampleError(false);
      return;
    }
    if (activeSample.contents === false) {
      setFresh(false);
      setSampleError(false);
      return;
    }
    setFresh(true);
    if (sample !== activeSample.contents) {
      setSample(activeSample.contents);
    }
    setSampleError(false);
  }, [activeSample, sample, setSampleError, setFresh, setSample, reload]);

  return <></>;
}

function ExportWrapper() {
  const classes = useStyles();
  const sample = useRecoilValue(state.sample);

  let exportText = sample
    .map((s) => {
      return (
        `${s.name}\n` +
        "#,%\n" +
        sample[0].entries
          .map((x) => {
            return `${x.name},${x.uv}`;
          })
          .join("\n")
      );
    })
    .join("\n\n");

  return (
    <TextField
      className={classes.textbox}
      label="Export"
      readOnly={true}
      multiline
      rows={20}
      fullWidth
      value={exportText}
      variant="outlined"
    />
  );
}

function RollContainer() {
  const sample = useRecoilValue(state.sample);
  const [roll, setRoll] = useState("--");
  return (
    <>
      {roll ? (
        <Typography variant="h1" component="h2" gutterBottom>
          {roll}
        </Typography>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setRoll(rollOn(sample[0].raw))}
      >
        Roll
      </Button>
    </>
  );
}

function Freshness() {
  const classes = useStyles();
  let fresh = useRecoilValue(state.fresh);
  return (
    <div
      className={classes.freshness}
      style={{ display: fresh ? "none" : "block" }}
    ></div>
  );
}

function CalcResult() {
  const classes = useStyles();
  const [tabValue, handleTabChange] = useState(0);

  return (
    <Paper className={classes.paper}>
      <Freshness />
      <AppBar position="static">
        <Toolbar variant="dense">
          <Tabs
            value={tabValue}
            variant="scrollable"
            scrollButtons="auto"
            onChange={(e, v) => handleTabChange(v)}
            aria-label="simple tabs example"
          >
            <Tab label="Table" {...a11yProps(0)} />
            <Tab label="Graph" {...a11yProps(1)} />
            <Tab label="Export" {...a11yProps(2)} />
            <Tab label="Roller" {...a11yProps(4)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <CalcTable />
      </TabPanel>
      <TabPanel value={tabValue} index={1} className={classes.chart}>
        <Chart />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <ExportWrapper />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <RollContainer />
      </TabPanel>
    </Paper>
  );
}

function ZAlert() {
  const parsed = useRecoilValue(state.parsed);
  return (
    <Alert severity="info" style={{ fontFamily: "monospace" }}>
      {parsed.v ? debug(parsed.v) : ""}
    </Alert>
  );
}

export default function Calculate() {
  const classes = useStyles();
  const q = useQuery();
  const [didLoadQuery, setDidLoadQuery] = useState(false);
  const setQuery = useSetRecoilState(state.query);

  if (q.get("input") && !didLoadQuery) {
    setTimeout(() => {
      setQuery(q.get("input"));
      setDidLoadQuery(true);
    });
  }

  return (
    <>
      <CalcInput />
      <Card className={classes.bar}>
        <CardActions>
          <OptionBar />
        </CardActions>
      </Card>
      <SilentErrorBoundary>
        <Suspense>
          <SampleCacher />
        </Suspense>
      </SilentErrorBoundary>
      <br />
      <SilentErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          {" "}
          <CalcResult />
        </React.Suspense>
      </SilentErrorBoundary>
      <br />

      <br />
      <ZAlert />
    </>
  );
}
