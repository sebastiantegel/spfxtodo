import { ITodoItem } from "../models/ISPList";

export interface IDataService {
  get(): Promise<ITodoItem[]>;
  changeComplete(id: number) : Promise<ITodoItem[]>;
}
