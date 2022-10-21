import React from "react";
import {
  Box,
  Modal,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import deleteIcon from "../../../assets/ic_delete.svg";

export default function ModalSuccess({
  open,
  handleClose,
  title,
  description,
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
          backgroundColor: "#FFFFFF",
          width: "467px",
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
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <img
              onClick={() => {
                handleClose(false);
              }}
              style={{ margin: 10, width: 26, height: 26, cursor: "pointer" }}
              src={deleteIcon}
              alt=""
            />
          </Grid>
          <Grid container spacing={1} style={{ padding: "0 20px 0 20px" }}>
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
                  backgroundColor: "rgb(213,245,227)",
                  color: "#2ECC71",
                }}
              >
                <CheckCircleIcon></CheckCircleIcon>
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
                {title}
              </Typography>
            </Grid>
            {description && (
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
            )}
            <Grid
              item
              xs={12}
              container
              irection="row"
              justifyContent="center"
              alignItems="center"
              style={{ paddingBottom: 50, paddingTop: 20 }}
            >
              <Button
                variant="contained"
                onClick={() => handleClose(false)}
                style={{
                  backgroundColor: "#2ECC71",
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
        </Grid>
      </Box>
    </Modal>
  );
}
