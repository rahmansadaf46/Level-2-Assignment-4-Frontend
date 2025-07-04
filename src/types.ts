export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
  assignedTo: string | null;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IBook {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: Date;
}

export interface IBorrowSummary {
  _id: string;
  book: { title: string; isbn: string };
  totalQuantity: number;
}
