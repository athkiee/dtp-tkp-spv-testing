import React from "react";
import { Box, Modal, Grid, Avatar, Typography } from "@material-ui/core";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from '@mui/icons-material/Close';

export default function ModalLoading({ open, handleClose }) {
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
                backgroundColor: "rgba(213, 17, 0, 0.1)",
                color: "#DA1E20",
              }}
            >
              <CachedIcon></CachedIcon>
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
                color: "#DA1E20",
                fontFamily: "Montserrat",
              }}
            >
              Mengekspor File
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
              Tunggu hingga selesai dan cek secara berkala.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}