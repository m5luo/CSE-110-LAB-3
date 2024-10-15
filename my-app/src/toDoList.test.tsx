import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("Create ToDoList", () => {
    test("renders todoList items", () => {
      render(<ToDoList />);
   
      const banana = screen.getByText('Bananas');
      const apple = screen.getByText('Apples');

      expect(banana).toBeInTheDocument();
      expect(apple).toBeInTheDocument();
    });
});

describe("Check Checkbox", () => {
    test('checkbox item brought increments counter', ()=>{
        render(<ToDoList />);
        const checkbox = screen.getAllByTestId('checkboxID');
        const counter = screen.getByText('Items bought: 0');
    
        fireEvent.click(checkbox[0]);
    
        expect(counter).toHaveTextContent('Items bought: 1');
    });
});