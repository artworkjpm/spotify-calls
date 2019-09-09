import React from "react";

export default function ImageComponent(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(open => !open);
    //console.log(open);
  };

  return <div>{props.artistImage.images.length > 0 ? <img style={{ float: "left" }} src={props.artistImage.images[0].url} alt="group" width="80" height="80" onClick={handleOpen} className={open ? "infoImage" : ""} /> : ""}</div>;
}
