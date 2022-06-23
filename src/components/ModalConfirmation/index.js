import {
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PropTypes from "prop-types";
import React from "react";

export default function ModalConfirmation({
  title,
  description,
  open,
  handleClose,
  getData,
}) {
  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
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
              <WarningAmberIcon></WarningAmberIcon>
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
                textAlign: "center",
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
            xs={6}
            container
            irection="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Button
              variant="outlined"
              onClick={() => handleClose(false)}
              style={{
                borderColor: "black",
                color: "black",
                width: "60%",
                height: "40px",
                borderRadius: "10px",
              }}
            >
              Tidak
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            container
            irection="row"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              onClick={() => getData()}
              style={{
                backgroundColor: "#DA1E20",
                color: "white",
                width: "60%",
                height: "40px",
                borderRadius: "10px",
              }}
            >
              Ya
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

ModalConfirmation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  getData: PropTypes.func,
};