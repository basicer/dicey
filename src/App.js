import React, { Suspense, useState, useEffect } from "react";
import clsx from "clsx";
import { BrowserRouter, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { blue, pink } from "@material-ui/core/colors";
import {
  makeStyles,
  ThemeProvider,
  darken,
  createMuiTheme,
} from "@material-ui/core/styles";

import {
  useRecoilState,
  useRecoilValue,
} from "recoil";

import Navigation from "./components/Navigation";

import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import styles from "./styles";

import {
  //  Alert,
  //  Snackbar,
  AppBar,
  Toolbar,
  IconButton,
  MenuIcon,
  Typography,
  //  SettingsIcon,
  InvertColorsIcon,
  //  AccountCircleIcon,
  Container,
  //  Grid,
  //  Dialog,
  CircularProgress,
  Backdrop,
  Snackbar,
  Button,
  //  Badge,
  //  NotificationsIcon,
  //  Menu,
  //  MenuItem,
  //  MenuList,
  //  ListItemIcon,
  //  LockIcon,
  //  FormControlLabel,
} from "./material";

import Calculate from "./components/Calculate";
import Docs from "./components/Doc";

import * as state from "./state";

let dox = require.context("!raw-loader!./docs", false, /\.md$/);
const useStyles = makeStyles(styles);

export function Analytics() {

  const location = useLocation();

  useEffect(() => {
    if (!process.env.REACT_APP_GA_UA) return;

    import('react-ga4').then((mod) => {
      let ReactGA = mod.default;
      ReactGA.initialize([{trackingId: process.env.REACT_APP_GA_UA}]);
      ReactGA.pageview(location.pathname + location.search);
    });
  }, [location]);

  return null;
}

export default function App() {
  const classes = useStyles();
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  let [paletteType, setPaletType] = useState(undefined);

  paletteType = paletteType || (isDark ? "dark" : "light");

  const theme = React.useMemo(() => {
    const nextTheme = createMuiTheme({
      palette: {
        primary: {
          main: paletteType === "light" ? blue[700] : blue[200],
        },
        secondary: {
          main: paletteType === "light" ? darken(pink.A400, 0.1) : pink[200],
        },
        type: paletteType,
        background: {
          //default: paletteType === 'light' ? '#fff' : '#121212',
        },
      },
    });

    return nextTheme;
  }, [paletteType]);

  const history = useHistory();
  if (localStorage.redirect) {
    history.replace(localStorage.redirect);
    delete localStorage.redirect;
  }

  // const [settingsOpen, setSettingsOpen] = React.useState(false);

  const [open, setOpen] = React.useState(undefined);
  const shouldStartClosed = useMediaQuery(theme.breakpoints.up("md"));
  let amOpen = typeof open === "undefined" ? shouldStartClosed : open;

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [showReload, setShowReload] = useRecoilState(state.showReload);
  const waitingWorker = useRecoilValue(state.waitingWorker);
  const update = () => {
    console.log("UPDATE!");
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={classes.root}>
            <CssBaseline />
            <Snackbar 
              message="A new version of the app is available!"
              action={
                <Button onClick={update} color="inherit" size="small">
                  Update
                </Button>
              }
              open={showReload}
              autoHideDuration={6000}
              onClose={() => setShowReload(false)}
            >
            </Snackbar>
            <AppBar
              position="absolute"
              className={clsx(classes.appBar, amOpen && classes.appBarShift)}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    amOpen && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Dicey
                </Typography>

                <IconButton
                  color="inherit"
                  onClick={() =>
                    setPaletType(paletteType === "light" ? "dark" : "light")
                  }
                >
                  <InvertColorsIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Navigation open={amOpen} handleDrawerClose={handleDrawerClose} />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Suspense
                  fallback={
                    <Backdrop className={classes.backdrop}>
                      <CircularProgress size="200px" />
                    </Backdrop>
                  }
                >
                  <Switch>
                    <Route exact path="/" component={Calculate} />
                    <Route
                      path="/:page"
                      render={({ match }) => {
                        let path = `./${match.params.page}.md`;
                        if (dox.keys().indexOf(path) !== -1)
                          return <Docs markdown={dox(path).default} />;
                        else return <h1>404</h1>;
                      }}
                    />
                  </Switch>
                </Suspense>
              </Container>
            </main>
          </div>
          <Analytics />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
