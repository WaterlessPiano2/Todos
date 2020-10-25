import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { Button, FormControlLabel, FormGroup } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  getTodoItemsFromLocalStorage,
  saveTodoItemsToLocalStorage,
} from "../helper";
import { ITaskForm } from "./TaskForm";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "680px",
    display: "block",
    margin: "0 auto",
  },
  list: {
    marginTop: 40,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
  },
  emptyListMessage: {
    marginTop: 50,
    textAlign: "center",
  },
  createButton: {
    marginTop: 25,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  toggleComplete: {
    paddingLeft: 16,
    width: 125,
  },
  taskTitle: { fontSize: 30 },
  taskDescription: {
    maxWidth: "500px",
  },
}));

const TasksList = () => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [todoItems, setTodoItems] = React.useState(
    getTodoItemsFromLocalStorage("todo") || []
  );
  const history = useHistory();

  function toggleCompleted(id: number) {
    const newTodoItems = todoItems.map((t) => {
      if (t.id === id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    saveTodoItemsToLocalStorage("todo", newTodoItems);

    setTodoItems(newTodoItems);
  }

  function deleteTask(id: number) {
    console.log(id);
    const newTodoItems = todoItems.filter((t) => t.id !== id);
    saveTodoItemsToLocalStorage("todo", newTodoItems);

    setTodoItems(newTodoItems);
  }

  function generateList(todos: ITaskForm[]): JSX.Element[] {
    return todos.map((todo: ITaskForm) => {
      return (
        <ListItem key={Math.random().toString()}>
          <ListItemIcon className={classes.toggleComplete}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    checked={todo.isCompleted}
                    onChange={(event) => toggleCompleted(todo.id)}
                  />
                }
                label={todo.isCompleted ? "Completed" : "Not Completed"}
              />
            </FormGroup>
          </ListItemIcon>
          <ListItemIcon className={classes.toggleComplete}>
            {new Date(todo.dueDate) > new Date() ? "Got time left" : "Overdue"}
          </ListItemIcon>

          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>

          <Grid container direction="column">
            <Grid item lg={10} md={7} sm={6} xs={5}>
              <Typography
                className={classes.taskTitle}
                variant="inherit"
                display="block"
                noWrap
              >
                {todo.title}
              </Typography>
            </Grid>
            <Grid item lg={10} md={8} sm={7} xs={6}>
              <Typography
                className={classes.taskDescription}
                variant="inherit"
                display="block"
                noWrap
              >
                {todo.description}
              </Typography>
            </Grid>
          </Grid>
          <ListItemSecondaryAction>
            <IconButton
              edge="start"
              aria-label="edit"
              onClick={() => history.push(`/edit/${todo.id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton edge="start" aria-label="search">
              <SearchIcon />
            </IconButton>
            <IconButton
              edge="start"
              aria-label="delete"
              onClick={() => deleteTask(todo.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Tasks
          </Typography>
        </Grid>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={dense}
                onChange={(event) => setDense(event.target.checked)}
              />
            }
            label="Enable dense"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={(event) => setSecondary(event.target.checked)}
              />
            }
            label="Enable secondary text"
          />
        </FormGroup>
        <Grid item xs={12}>
          <Button
            className={classes.createButton}
            component={Link}
            to="/new"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Create a new Task
          </Button>
        </Grid>
      </Grid>

      {todoItems.length ? (
        <div className={classes.list}>
          <List>{generateList(todoItems)}</List>
        </div>
      ) : (
        <Typography
          className={classes.emptyListMessage}
          variant="h4"
          gutterBottom
        >
          You have not created any tasks.
        </Typography>
      )}
    </div>
  );
};

export default TasksList;
