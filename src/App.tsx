import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Tasks from "./pages/Tasks";
import NewTask from "./pages/NewTask";
import ResponsiveDrawer from "./components/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  responsive: {
    paddingTop: 60,
    paddingLeft: 150,
    paddingright: 20,
    marginRight: 20,
    //backgroundColor: "red",
  },
});

const routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Tasks />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/new">
        <NewTask />
      </Route>
    </Switch>
  );
};

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <ResponsiveDrawer />
        <Container className={classes.responsive} fixed>
          <div>{routes()}</div>
        </Container>
      </div>
    </Router>
  );
};

export default function BasicExample() {
  return <App />;
}
