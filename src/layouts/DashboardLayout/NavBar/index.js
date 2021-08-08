import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";
const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/app/progress",
    icon: UsersIcon,
    title: "Progress",
  },
  {
    href: "/app/completed",
    icon: ShoppingBagIcon,
    title: "Completed",
  },
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Rewards",
  },
  {
    href: "/app/profile",
    icon: SettingsIcon,
    title: "Profile",
  }  
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const  {user} = useSelector((store) => store.auth);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={"/static/images/avatar_6.png"}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user?.first_name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user?.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(({title,icon,href}) => (
            <NavItem
              href={href}
              key={title}
              title={title}
              icon={icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
