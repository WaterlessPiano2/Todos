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
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getTodoItemsFromLocalStorage } from "../helper";
import { ITaskForm } from "./TaskForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "680px",
    display: "block",
    margin: "0 auto",
  },
  demo: {
    marginTop: 10,
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
}));

function generateList(todos: ITaskForm[]): JSX.Element[] {
  return todos.map((todo) => {
    return (
      <ListItem>
        <ListItemIcon>
          <Checkbox edge="start" checked={todo.isCompleted} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={todo.title} secondary={todo.description} />
        <ListItemSecondaryAction>
          <IconButton edge="start" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton edge="start" aria-label="delete">
            <SearchIcon />
          </IconButton>
          <IconButton edge="start" aria-label="search">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
}

const TasksList = () => {
  const classes = useStyles();
  const todoItems:ITaskForm[] = getTodoItemsFromLocalStorage("todo") || [];

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Tasks
          </Typography>
        </Grid>
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
        <div className={classes.demo}>
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
