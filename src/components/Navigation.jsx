import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";

import styles from "../styles";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import { NavLink as RouterLink } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  //Switch,
  AccountTreeIcon,
  Box,
} from "../material";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

//import ListSubheader from "@material-ui/core/ListSubheader";

//import MenuIcon from "@material-ui/icons/Menu";
//import ListIcon from "@material-ui/icons/List";
//import DashboardIcon from "@material-ui/icons/Dashboard";
//import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FunctionsIcon from "@material-ui/icons/Functions";
//import BarChartIcon from "@material-ui/icons/BarChart";
//import LayersIcon from "@material-ui/icons/Layers";
import DescriptionIcon from "@material-ui/icons/Description";
import BallotIcon from "@material-ui/icons/Ballot";
//import FindInPageIcon from "@material-ui/icons/FindInPage";
import ContactlessIcon from "@material-ui/icons/Contactless";
// import ExploreIcon from "@material-ui/icons/Explore";

//import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles(styles);

export default function Navigation({ open, handleDrawerClose }) {
  const classes = useStyles();

  let links = [
    ["Calculator", "/", <DescriptionIcon />, { exact: true }],
    ["Documentation", "/docs", <BallotIcon />],
    // ["Examples", "/examples", <ExploreIcon />],
    ["Function Library", "/functions", <FunctionsIcon />],
    ["About", "/about", <ContactlessIcon />],
  ];
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {links.map(([name, url, icon, extra = {}]) => (
          <ListItem
            {...extra}
            button
            activeClassName="Mui-selected"
            component={RouterLink}
            key={name}
            to={url}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
        <Divider />
        {false && (
          <ListItem>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Simulator" />
            <ListItemSecondaryAction hidden={!open}></ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
      {open && (
        <Box className={classes.filler}>
          <Box className={classes.byline}>
            made by{" "}
            <a className={classes.muted} href="http://github.com/basicer">
              Rob
            </a>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
