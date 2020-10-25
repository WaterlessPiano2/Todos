import React from "react";
import { useRouteMatch } from "react-router-dom";
import { ITaskForm } from "../components/TaskForm";
import { getTodoItemsFromLocalStorage } from "../helper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "8000px",
      display: "block",
      margin: "0 auto",
    },
    text: { textAlign: "left" },
  })
);
const TaskInfo = () => {
  const classes = useStyles();
  const match = useRouteMatch("/info/:id");
  const [defaultInputs, setDefaultInputs] = React.useState({});
  const todoItems: ITaskForm[] = getTodoItemsFromLocalStorage("todo") || [];

  React.useEffect(() => {
    if (match !== null && match.params) {
      const params = match.params;
      let id: number;
      for (const [key, value] of Object.entries(params)) {
        if (typeof value === `string`) {
          id = Number(value);

          const todos = todoItems.filter((t) => t.id === id);
          setDefaultInputs(todos[0]);
        }
      }
    }
  }, []);

  const findValue = (key: string, value: any) => {
    console.log(value);
    return key === "dueDate"
      ? new Date(value).toLocaleString()
      : value.toString();
  };

  const unCamelCase = (str: string) => {
    return (
      str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  };

  const Details = () => {
    let items: JSX.Element[] = [];
    for (const [key, value] of Object.entries(defaultInputs)) {
      items.push(
        <Grid item lg={12} md={11} sm={10} xs={9} key={key}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            {unCamelCase(key)}: {findValue(key, value)}
          </Typography>
        </Grid>
      );
    }
    return items;
  };

  return (
    <Grid
      container
      justify="space-around"
      direction="row"
      className={classes.root}
    >
      {Details()}
    </Grid>
  );
};
export default TaskInfo;
