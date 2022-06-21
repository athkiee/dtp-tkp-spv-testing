import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import { List, Collapse } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { ROUTES } from "../../configs/";

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nestedListafter: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#fff",
    color: "red",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#fff",
      color: "red",
      fontWeight: "bold",
    },
  },
  nestedListBefore: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#fff",
      color: "red",
      fontWeight: "bold",
    },
  },
  ListItemafter: {
    backgroundColor: "#fff",
    color: "red",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#fff",
      color: "red",
      fontWeight: "bold",
    },
  },
  ListItembefore: {
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#fff",
      color: "black",
      fontWeight: "bold",
    },
  },
}));

export default function SideMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open1 = Boolean(anchorEl);
  return (
    <div>
      <ListItem
        className={
          window.location.pathname === "/Dashboard"
            ? classes.ListItemafter
            : classes.ListItembefore
        }
        component={Link}
        to="/Dashboard"
      >
        <ListItemIcon
          className={
            window.location.pathname === "/Dashboard"
              ? classes.ListItemafter
              : classes.ListItembefore
          }
          
        >
          <HomeOutlinedIcon />
        </ListItemIcon>
       
        <ListItemText primary="Beranda" />
      </ListItem>

      <ListItem
        className={open ? classes.ListItemabefore : classes.ListItemafter}
        button
        onClick={handleClick}
      >
        <ListItemIcon
          className={open ? classes.ListItembefore : classes.ListItemafter}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <DescriptionOutlinedIcon />
        </ListItemIcon>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open1}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>Mengajukan TKP</Typography>
          <Typography sx={{ p: 1 }}>Dalam Proses</Typography>
          <Typography sx={{ p: 1 }}>Riwayat </Typography>

        </Popover>

        <ListItemText primary="Pengajuan TKP" />
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <Link to={ROUTES.PENGAJUAN_TKP} style={{ color: "black" }}>
          <List alignItems="center" component="div">
            <ListItem
              button
              className={
                window.location.pathname === "/pengajuan-tkp/supervisor"
                  ? classes.nestedListafter
                  : classes.nestedListBefore
              }
            >
              <ListItemText primary="Mengajukan TKP" />
            </ListItem>
          </List>
        </Link>
        <Link to={ROUTES.PENGAJUAN_TKP_DALAM_PROSES} style={{ color: "black" }}>
          <List component="div">
            <ListItem
              button
              className={
                window.location.pathname === "/pengajuan-tkp/dalam-proses"
                  ? classes.nestedListafter
                  : classes.nestedListBefore
              }
            >
              <ListItemText primary="Dalam Proses"></ListItemText>
            </ListItem>
          </List>
        </Link>
        <Link to={ROUTES.PENGAJUAN_TKP_RIWAYAT} style={{ color: "black" }}>
          <List component="div">
            <ListItem
              button
              className={
                window.location.pathname === "/riwayat-tkp/"
                  ? classes.nestedListafter
                  : classes.nestedListBefore
              }
            >
              <ListItemText primary="Riwayat" />
            </ListItem>
          </List>
        </Link>
      </Collapse>

      <Link to={ROUTES.KELOLA_EVALUASI_TKP} style={{ color: "black" }}>
        <ListItem>
          <ListItemIcon
            className={
              window.location.pathname === "/kelola-evaluasi-tkp"
                ? classes.ListItemafter
                : classes.ListItembefore
            }
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            className={
              window.location.pathname === "/kelola-evaluasi-tkp"
                ? classes.ListItemafter
                : classes.ListItembefore
            }
            primary="Evaluasi TKP"
          ></ListItemText>
        </ListItem>
      </Link>
    </div>
  );
}
