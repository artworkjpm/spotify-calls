import React from "react";
import Modal from "@material-ui/core/Modal";

export default function ImageComponent(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /* const classes = useStyles(); */

  return (
    <>
      <img src={props.artistImage.images[0].url} alt="group" width="80" height="80" onClick={handleOpen} />
      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={open} onClose={handleClose}>
        <div className="Modal-new-image">
          <img src={props.artistImage.images[0].url} alt="group" className="infoImage" />
        </div>
      </Modal>
    </>
  );
}
