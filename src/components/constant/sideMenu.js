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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SideMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <ListItem button component={Link} to="/Dashboard">
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <DescriptionOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Pengajuan TKP" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List alignItems="center" component="div">
          <ListItem button className={classes.nested}>
            <ListItemText primary="Mengajukan TKP" />
          </ListItem>
        </List>
        <List component="div">
          <ListItem button className={classes.nested}>
            <ListItemText primary="Dalam Proses" />
          </ListItem>
        </List>
        <List component="div">
          <ListItem button className={classes.nested}>
            <ListItemText primary="Riwayat" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Evaluasi TKP" />
      </ListItem>
    </div>
  );
}
