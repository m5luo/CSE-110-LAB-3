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


describe("Check Checkbox Increment", () => {
    test('checkbox item bought counter increments after checking', ()=>{
        render(<ToDoList />);
        const checkbox = screen.getAllByTestId('checkboxID');
        const counter = screen.getByText('Items bought: 0');

        fireEvent.click(checkbox[0]);

        expect(counter).toHaveTextContent('Items bought: 1');
    })
});


describe("Check Checkbox Increment and Decrement", () => {
    test('checkbox item bought counter increments and decrements after checking and unchecking', ()=>{
        render(<ToDoList />);
        const checkbox = screen.getAllByTestId('checkboxID');
        const counter = screen.getByText('Items bought: 0');
        expect(counter).toHaveTextContent('Items bought: 0');
        
        fireEvent.click(checkbox[1]);

        expect(counter).toHaveTextContent('Items bought: 1');

        fireEvent.click(checkbox[0]);
        
        expect(counter).toHaveTextContent('Items bought: 0');
    })
});