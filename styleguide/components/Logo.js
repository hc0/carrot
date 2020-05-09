import React from "react";
import PropTypes from "prop-types";
import Styled from "rsg-components/Styled";
import logo from "./logo.png";

const styles = ({ fontFamily, color }) => ({
  logo: {
    display: "flex",
    alignItems: "center",
    padding: [[8, 10]],
    margin: 0,
    // marginLeft: "calc(-280/980*100%)",
    fontFamily: fontFamily.base,
    fontSize: 18,
    fontWeight: "normal",
    color: color.baseBackground,
  },
  image: {
    // width: "2.5em",
    maxHeight: "32px",
    marginLeft: "-0.5em",
    padding: [[0, 5]],
  },
});

export function LogoRenderer ({ classes, children }) {
  return (
    <h1 className={classes.logo}>
      <img className={classes.image} src={logo} alt="logo" />
      {children}
    </h1>
  );
}

LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
