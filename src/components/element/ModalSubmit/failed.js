import React from "react";
import {
  Box,
  Modal,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ModalFailed({ open, handleClose, title, description }) {
  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          backgroundColor: "#ffffff",
          width: 467,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          borderRadius: 10,
          padding: 0,
          boxShadow: "rgba(0, 0, 0, 0.25)",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="end"
            display="flex"
          >
            <Button
              onClick={() => {
                handleClose(false);
              }}
              style={{
                hover: "none",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                marginRight: -10
              }}
            ><Avatar
              variant="elips"
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#E0E0E0",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >X</Avatar>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Avatar
              variant="elips"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(213, 17, 0, 0.1)",
                color: "#EE2E24",
              }}
            >
              <CancelIcon></CancelIcon>
            </Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#EE2E24",
                fontFamily: "Montserrat",
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Typography
              variant="body1"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            irection="row"
            justifyContent="center"
            alignItems="center"
            style={{paddingBottom:20, paddingTop:20}}
          >
            <Button
              variant="contained"
              onClick={() => handleClose(false)}
              style={{
                backgroundColor: "#EE2E24",
                color: "white",
                width: "20%",
                height: "40px",
                borderRadius: "10px",
              }}
            >
              Ok
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}