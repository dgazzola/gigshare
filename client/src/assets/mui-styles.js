export const buttonStyle = {
  color: "rgba(149, 0, 255, 0.8)",
  borderColor: "rgba(149, 0, 255, 0.8)",
  textTransform: "none",
  fontFamily: "Karla, sans-serif",
  "&:hover": {
    borderColor: "rgba(149, 0, 255, 1)",
    color: "rgba(149, 0, 255, 1)",
  },
};

export const addArtistModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export const addGigModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "2px solid rgba(149, 0, 255, 0.8)",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
