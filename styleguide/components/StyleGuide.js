import React from "react";
import PropTypes from "prop-types";
import Logo from "rsg-components/Logo";
import Markdown from "rsg-components/Markdown";
import Styled from "rsg-components/Styled";

const xsmall = "@media (max-width: 600px)";

const styles = ({
  font, base, light, link, baseBackground, small
}) => ({
  root: {
    color: base,
    backgroundColor: baseBackground,
  },
  header: {
    color: "#fff",
    backgroundColor: link,
    position: "fixed",
    left: 0,
    right: 0,
    zIndex: 1
  },
  bar: {
    display: "flex",
    [xsmall]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  nav: {
    display: "flex",
    alignItems: "center",
    padding: [[15, 10]],
    marginLeft: "auto",
    marginRight: "-0.5em",
    [xsmall]: {
      margin: [[10, 0, 0]],
    },
  },
  headerLink: {
    "&, &:link, &:visited": {
      marginLeft: "0.5em",
      marginRight: "0.5em",
      fontFamily: font,
      color: "#efefef",
    },
    "&:hover, &:active": {
      color: "#fff",
      cursor: "pointer",
    },
  },
  content: {
    maxWidth: 1200,
    padding: [[60, 10, 15, 210]],
    margin: [[0, "auto"]],
    [small]: {
      padding: 15,
    },
    display: "block",
  },
  contentNoSide: {
    maxWidth: 1200,
    padding: [[15, 30]],
    margin: [[0, "auto"]],
    [small]: {
      padding: 15,
    },
    display: "block",
  },
  sidebar: {
    // backgroundColor: "blue",
    // border: [["red", "solid"]],
    borderWidth: [[0, 1, 0, 0]],
    position: "fixed",
    top: 62,
    left: 5,
    bottom: 0,
    width: 200,
    overflow: "auto",
    [small]: {
      padding: 15,
      position: "static",
      width: "auto",
      borderWidth: [[1, 0, 0, 0]],
    },
  },
  components: {
    overflow: "auto", // To prevent the pane from growing out of the screen
  },
  footer: {
    display: "block",
    color: light,
    fontFamily: font,
    fontSize: 12,
  },
});

const StyleGuideRenderer = (obj) => {
  console.log(obj);
  const {
    classes,
    title,
    children,
    toc,
    hasSidebar
  } = obj;
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.bar}>
          <Logo>{title}</Logo>
          <nav className={classes.nav}>
            <a className={classes.headerLink} href="./docs/index.html">APIDocs</a>
          </nav>
        </div>
      </header>
      <main className={hasSidebar ? classes.content : classes.contentNoSide}>
        {children}
        <footer className={classes.footer}>
          <Markdown text="Created By [Djoz](mailto:songdun@iciyun.com) ❤️" />
        </footer>
      </main>
      {
        hasSidebar && (
          <aside className={classes.sidebar}>
            {toc}
          </aside>
        )
      }
    </div>
  );
};

export { StyleGuideRenderer };

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Styled(styles)(StyleGuideRenderer);
