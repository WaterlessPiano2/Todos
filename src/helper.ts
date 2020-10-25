export const getTodoItemsFromLocalStorage = (key: string) => {
  const value: string | null = localStorage.getItem(key);

  let todoItems = null;

  try {
    if (typeof value === "string") {
      const parsedJSON = JSON.parse(value);

      if (Array.isArray(parsedJSON)) {
        todoItems = parsedJSON;
      }
    }
  } catch (e) {
    todoItems = [];
  }

  return todoItems;
};

export const saveTodoItemsToLocalStorage = (
  key: string,
  data: { string: string | boolean | Date }
) => localStorage.setItem(key, JSON.stringify(data))