import { sp } from '@pnp/sp';
import { ITodoItem } from '../models/ISPList';
import { IDataService } from './IService';

export default class PNPDataService implements IDataService {

  private _listTitle: string;

  constructor(listTitle: string) {
    this._listTitle = listTitle;

    this.changeComplete = this.changeComplete.bind(this);
  }

  public changeComplete(id: number) : Promise<ITodoItem[]> {
    console.log("Handling update with PNP");

    return sp.web.lists.getByTitle(this._listTitle).items.getById(id).get().then((result: ITodoItem) => {
        return sp.web.lists.getByTitle(this._listTitle).items.getById(id).select("Completed").get().then((item: any) => {
            return sp.web.lists.getByTitle(this._listTitle).items.getById(id).update({
                'Completed': !item.Completed
            }).then(() => {
                return this.get();
            });
        });
    });
  }

  public get(): Promise<ITodoItem[]> {
    return sp.web.lists.getByTitle(this._listTitle).items.orderBy("DueDate").get().then((result) => {
      let todoItemsList: ITodoItem[] = [];

      result.map((item: any) => {
        todoItemsList.push({ Id: item.ID, Title: item.Title, Complete: item.Completed });
      });

      return todoItemsList;
    });
  }
}
