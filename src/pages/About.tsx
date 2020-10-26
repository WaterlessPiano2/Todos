import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "1000px",
      display: "block",
      margin: "0 auto",
    },
    title: { textAlign: "center" },
  })
);
const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        variant="h3"
        gutterBottom
      >
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        In this page we will talk about the reasons behind tech decisions. We
        will also talk about the features.
      </Typography>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Boiler Plate
      </Typography>
      <Typography variant="body1" gutterBottom>
        I choose to use "create-react-app" as a boiler plate because it is the
        most common quick starter template for react. Being commonly used I can
        find support and plugins easier, compared to something not as popular. I
        have experince using it long time ago. It comes with TypeScript support
        and built in test framework, so this saved me time at the start.
      </Typography>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Reusable Components
      </Typography>
      <Typography variant="body1" gutterBottom>
        Material UI is the world's most popular React UI framework. I have
        experience using it, and I like their documentations. Material-UI is
        based on Google's styling guide.
      </Typography>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Responsive
      </Typography>
      <Typography variant="body1" gutterBottom>
        This site is fully responsive, where user should not have to scroll sideways if they access this site with a smaller device.
      </Typography>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Themes
      </Typography>
      <Typography variant="body1" gutterBottom>
        It is easy to change theme pallettes thanks to Material UI's theme
        palettes. For the time being the theme is hard coded to the dark mode
        because the white backgroung was hurting my eyes. In the future we can
        make themes changeable by the user.
      </Typography>
    </div>
  );
};

export default About;
