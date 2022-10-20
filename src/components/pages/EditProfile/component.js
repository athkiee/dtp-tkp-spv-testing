import React, { useState } from "react";
import axios from "axios";
import { Grid, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Select, Breadcrumb, Modal, Form, Input, InputNumber } from "antd";
import { ROUTES, API } from "../../../configs";
import HeadBar from "../../constant/headBar";
// import ModalSuccess from "../../../element/ModalSuccess";
// import ModalFailed from "../../../element/ModalFailed";

function EditProfile(){
    const useStyles = makeStyles((theme) => ({
        root: {
          display: "flex",
        },
        toolbar: {
          paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px",
          ...theme.mixins.toolbar,
        },
        submitForm: {
          width: "150px",
          height: "40px",
          color: "white",
          borderColor: "#DA1E20",
          borderRadius: 10,
          backgroundColor: "#DA1E20",
          // "&:hover": {
          //   color: "#DA1E20",
          //   backgroundColor: "white",
          //   borderColor: "#DA1E20",
          // },
        },
        containerEditSpv: {
          maxWidth: "95.3%",
          height: "auto",
          float: "center",
          marginLeft: 35,
          backgroundColor: "white",
          borderRadius: 10,
        },
        menuButton: {
          marginRight: 36,
        },
        menuButtonHidden: {
          display: "none",
        },
        title: {
          flexGrow: 1,
        },
        negativeCase: {
          fontSize: "12px",
          color: "#EE2E24",
        },
        noteModal: {
          marginTop: "8px",
          fontSize: "11px",
          lineHeight: "12px",
          color: "rgba(0, 0, 0, 0.6)",
        },
        inputForm: {
          display: "block",
          paddingLeft: 10,
          borderRadius: 2,
          height: 40,
          width: "100%",
        },
        inputPassword: {
          borderRadius: 2,
          height: 40,
          width: "100%",
        },
        selectForm: {
          display: "block",
          paddingLeft: 2,
          borderRadius: 2,
          // height: 60,
          width: "100%",
        },
        drawerPaper: {
          position: "relative",
          whiteSpace: "nowrap",
          width: drawerWidth,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        drawerPaperClose: {
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
          },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#E5E5E5",
        },
        container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        },
        paper: {
          padding: theme.spacing(2),
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
        },
        fixedHeight: {
          height: 240,
        },
        btnActive:{
          color:"white",
          backgroundColor:"#d51200",
          border:"none",
          fontWeight:"bolder",
          fontSize:16,
          width:"100%",
          marginTop:"20px",
          marginBottom:"50px",
          borderRadius:"10px",
          textTransform:"capitalize"
        },
    
      }));
    const drawerWidth = 240;
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <HeadBar/>
            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Breadcrumb style={{ marginLeft: 35, marginTop: 35 }}>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            {/* <a href="#Beranda" onClick={this._handleBreadcumbs}>Beranda</a> */}
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a href="#KelolaAkun">Kelola Akun</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ cursor: "pointer" }}>
            <a
              href="#Spv"
              onClick={() => (window.location = ROUTES.KELOLA_SPV())}
            >
              Supervisor
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{
              cursor: "pointer",
              fontColor: "#DA1E20 !important",
              fontWeight: "bold",
            }}
          >
            <a href="#TambahAkun">Tambah Akun</a>
          </Breadcrumb.Item>
        </Breadcrumb>

            </main>
        </div>
    );
}
export default EditProfile