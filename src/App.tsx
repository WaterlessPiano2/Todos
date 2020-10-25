import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Tasks from "./pages/Tasks";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import ResponsiveDrawer from "./components/Menu";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  responsive: {
    marginTop: 60,
    padding: 20,
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
      <Route path="/edit/:id">
        <EditTask />
      </Route>
    </Switch>
  );
};
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <ResponsiveDrawer />
        <Container className={classes.responsive} fixed>
          <div>{routes()}</div>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default function BasicExample() {
  return <App />;
}
