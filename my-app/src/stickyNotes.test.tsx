import { render, screen, fireEvent, queryByAltText, queryByTestId, getByText } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import userEvent from "@testing-library/user-event";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

describe("Display, Update, Delete Sticky Notes", () => {
    test("all sticky notes are displayed", () => {
        render(<StickyNotes />);

        const listOfNotes = dummyNotesList;

        listOfNotes.forEach((note) => {
            const listItem = screen.getByText(note.title);
            expect(listItem).toBeInTheDocument();
        });
    });

    test("update note", () => {
        render(<StickyNotes />);

        const listOfNotes = dummyNotesList;

        const editNoteTitleInput = screen.getByText(listOfNotes[0].title);
        const editNoteContent =
            screen.getByText(dummyNotesList[0].content);

        userEvent.click(editNoteTitleInput);
        userEvent.keyboard(" abc");
        userEvent.click(editNoteContent);
        userEvent.keyboard(" abc");

        const updatedNoteTitle = screen.getByText(listOfNotes[0].title + " abc");
        const updatedNoteContent = screen.getByText(listOfNotes[0].content + " abc");

        expect(updatedNoteTitle).toBeInTheDocument();
        expect(updatedNoteContent).toBeInTheDocument();
    });

    test("delete note", () => {
        render(<StickyNotes />);

        const listOfNotes = dummyNotesList;

        const deletedNote = screen.getByText(listOfNotes[0].title);

        const deleteButtons = screen.getAllByTestId("delete-button")
        fireEvent.click(deleteButtons[0]);

        expect(deletedNote).not.toBeInTheDocument();
    });

    test("delete all", () => {
        render(<StickyNotes />);

        const listOfNotes = dummyNotesList;

        const deleteButtons = screen.getAllByTestId("delete-button")

        var deletedNotes: HTMLElement[] = [];
        
        listOfNotes.forEach((note) => 
            deletedNotes = [...deletedNotes, screen.getByText(note.title)]
        )
        
        deleteButtons.forEach((button) => 
            fireEvent.click(button)
        )

        deletedNotes.forEach((deletedNote) => 
            expect(deletedNote).not.toBeInTheDocument()
        )
    });
});