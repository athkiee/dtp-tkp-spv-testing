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
    
  }
}));

export default function SideMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
    
  };
  return (
    <div>
      <ListItem className={
        window.location.pathname === "/Dashboard" ? classes.ListItemafter : classes.ListItembefore
      } component={Link} to="/Dashboard">
        <ListItemIcon className={
          window.location.pathname === "/Dashboard" ? classes.ListItemafter : classes.ListItembefore
        } >
          <HomeOutlinedIcon  />
        </ListItemIcon>
        <ListItemText primary="Beranda" />
      </ListItem>

      <ListItem className={
        open ? classes.ListItemabefore : classes.ListItemafter
      }  button onClick={handleClick}>
        <ListItemIcon className={
          open ? classes.ListItembefore : classes.ListItemafter
        } >
          <DescriptionOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Pengajuan TKP" />
        {open ? <ExpandMore /> : <ExpandLess />}
        
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <Link to={ROUTES.PENGAJUAN_TKP} style={{ color: "black" }}>
          <List alignItems="center" component="div">
            <ListItem button className={
              window.location.pathname === "/pengajuan-tkp/supervisor" ? classes.nestedListafter : classes.nestedListBefore
            }>
              <ListItemText primary="Mengajukan TKP" />
            </ListItem>
          </List>
        </Link>
        <Link to={ROUTES.PENGAJUAN_TKP_DALAM_PROSES} style={{ color: "black" }}>
          <List component="div">
            <ListItem button className={
              window.location.pathname === "/pengajuan-tkp/dalam-proses" ? classes.nestedListafter : classes.nestedListBefore
            }>
              <ListItemText primary="Dalam Proses"></ListItemText>
            </ListItem>
          </List>
        </Link>
        <Link to={ROUTES.RIWAYAT_TKP} style={{ color: "black" }}>
          <List component="div">
            <ListItem button className={
              window.location.pathname === "/riwayat-tkp/" ? classes.nestedListafter : classes.nestedListBefore
            }>
              <ListItemText primary="Riwayat" />
            </ListItem>
          </List>
        </Link>
      </Collapse>

      <ListItem>
        <ListItemIcon className={
          window.location.pathname === "/kelola-evaluasi-tkp" ? classes.ListItemafter : classes.ListItembefore
        }>
          <PeopleIcon />
        </ListItemIcon>
        <Link to={ROUTES.KELOLA_EVALUASI_TKP} style={{ color: "black" }}>
          <ListItemText className={
            window.location.pathname === "/kelola-evaluasi-tkp" ? classes.ListItemafter : classes.ListItembefore
          }  primary="Evaluasi TKP"></ListItemText>
        </Link>
      </ListItem>
    </div>
  );
}
