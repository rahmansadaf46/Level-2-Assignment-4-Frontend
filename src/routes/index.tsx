import App from "@/App";
import BookDetails from "@/pages/books/BookDetails";
import Books from "@/pages/books/Books";
import CreateBook from "@/pages/books/CreateBook";
import UpdateBook from "@/pages/books/UpdateBook";
import BorrowBook from "@/pages/borrows/BorrowBook";
import BorrowSummary from "@/pages/borrows/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                element: <Books />,
            },
            {
                path: "books",
                element: <Books />,
            },
            {
                path: "create-book",
                element: <CreateBook />,
            },
            {
                path: "books/:id",
                element: <BookDetails />,
            },
            {
                path: "edit-book/:id",
                element: <UpdateBook />,
            },
            {
                path: "borrow/:bookId",
                element: <BorrowBook />,
            },
            {
                path: "borrow-summary",
                element: <BorrowSummary />,
            },

        ],
    },
]);

export default router;