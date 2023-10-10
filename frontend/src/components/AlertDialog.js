import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = ({
  open,
  onClose,
  dialogText,
  dialogContentText,
  dialogForm,
  ...others
}) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        {...others}
      >
        {dialogText && <DialogTitle sx={{ mb: 3 }}>{dialogText}</DialogTitle>}
        <DialogContent>
          {dialogContentText && (
            <DialogContentText id="alert-dialog-slide-description">
              {dialogContentText}
            </DialogContentText>
          )}
          {dialogForm}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default AlertDialog;
