import { ITodoItem } from "../../../models/ISPList";

export interface ITodoListProps {
  description: string;
  numberOfItems: number;

  todoItems: ITodoItem[];

  changeComplete(i: number): void;
}
