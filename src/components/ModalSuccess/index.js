import {
  Box,
  Modal,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";

export default function ModalSuccess({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          backgroundColor: "#E5E5E5",
          height: "280px",
          width: "467px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "rgba(0, 0, 0, 0.25)",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid container spacing={3} d>
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
                backgroundColor: "rgba(46, 204, 113, 0.2)",
                color: "#2ECC71",
              }}
            >
              <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
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
                color: "#2ECC71",
                fontFamily: "Montserrat",
              }}
            >
              Ekspor Data Berhasil
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            irection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                backgroundColor: "#2ECC71",
                color: "white",
                width: "20%",
                height: "40px",
                borderRadius: "14px",
                fontFamily: "Roboto",
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
