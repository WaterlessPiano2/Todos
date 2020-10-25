import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import {
  getTodoItemsFromLocalStorage,
  saveTodoItemsToLocalStorage,
} from "../helper";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "450px",
      display: "block",
      margin: "0 auto",
    },
    textField: {
      "& > *": {
        width: "100%",
      },
    },
    submitButton: {
      marginTop: "24px",
    },
    title: { textAlign: "center" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
  })
);

export interface ITaskForm {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  images?: string[];
}

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Task successfully created.",
    type: "success",
  },
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

const TaskForm: React.FunctionComponent = () => {
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });
  const todoItems: ITaskForm[] = getTodoItemsFromLocalStorage("todo") || [];

  const match = useRouteMatch("/edit/:id");
  if (match !== null && match.params) {
    console.log(match.params);

  }

  const createNewTask = (data: ITaskForm, resetForm: Function) => {
    try {
      if (data) {
        let latestTodoItem = null;
        if (todoItems.length === 1) {
          latestTodoItem = todoItems[0];
        } else if (todoItems.length > 1) {
          const todoItemsDescendingSortedById = todoItems.sort(
            (a, b) => b.id - a.id
          );
          latestTodoItem = todoItemsDescendingSortedById[0];
        }

        const newTodoItem = data;
        newTodoItem.id = latestTodoItem ? latestTodoItem.id + 1 : 0;
        const newTodoItems: ITaskForm[] = [newTodoItem, ...todoItems];

        saveTodoItemsToLocalStorage("todo", newTodoItems);

        setFormStatus(formStatusProps.success);
        resetForm({});
      }
    } catch (error) {
      setFormStatus(formStatusProps.error);
    } finally {
      setDisplayFormStatus(true);
    }
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          id: 0,
          title: "",
          description: "",
          isCompleted: false,
          dueDate: new Date(),
        }}
        onSubmit={(values: ITaskForm, actions) => {
          createNewTask(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .defined()
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
          description: Yup.string()
            .defined()
            .min(2, "Too Short!")
            .max(250, "Too Long!"),
          dueDate: Yup.date()
            .defined()
            .min(new Date(), "Due date can not be in the past"),
        })}
      >
        {(props: FormikProps<ITaskForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props;
          return (
            <Form>
              <h1 className={classes.title}>
                {" "}
                {isEditMode ? `Edit a` : `Create a new `}task
              </h1>
              <Grid container justify="space-around" direction="row">
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="title"
                    id="title"
                    label="Title"
                    value={values.title}
                    type="text"
                    helperText={
                      errors.title && touched.title ? errors.title : ""
                    }
                    error={errors.title && touched.title ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="description"
                    id="description"
                    label="Description"
                    value={values.description}
                    type="description"
                    multiline
                    helperText={
                      errors.description && touched.description
                        ? errors.description
                        : ""
                    }
                    error={
                      errors.description && touched.description ? true : false
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="dueDate"
                    id="dueDate"
                    label=""
                    value={values.dueDate}
                    type="datetime-local"
                    helperText={
                      errors.dueDate && touched.dueDate
                        ? errors.dueDate
                        : "Enter a due date and time"
                    }
                    error={errors.dueDate && touched.dueDate ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  {displayFormStatus && (
                    <div className="formStatus">
                      {formStatus.type === "error" ? (
                        <p className={classes.errorMessage}>
                          {formStatus.message}
                        </p>
                      ) : formStatus.type === "success" ? (
                        <p className={classes.successMessage}>
                          {formStatus.message}
                        </p>
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TaskForm;
