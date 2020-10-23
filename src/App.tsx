import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Tasks from "./pages/Tasks";
import NewTask from "./pages/NewTask";
import ResponsiveDrawer from "./components/Menu";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

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
  return (
    <Router>
      <div>
        <ResponsiveDrawer />
        {routes()}
      </div>
    </Router>
  );
};

export default function BasicExample() {
  return <App />;
}
