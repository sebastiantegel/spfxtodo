import { ITodoItem } from './../models/ISPList';
import { IDataService } from './IService';

export default class MockDataService implements IDataService  {

    private _items: ITodoItem[];

    public constructor() {
      this._items = [{ Id: 1, Title: 'Gå ut med hunden', Complete: true },
                     { Id: 2, Title: 'Handla mat', Complete: false },
                     { Id: 3, Title: 'Spring 10 km', Complete: false }];

      this.changeComplete = this.changeComplete.bind(this);
    }

    public changeComplete(i: number) : Promise<ITodoItem[]> {
      this._items[i].Complete = !this._items[i].Complete;

      return new Promise<ITodoItem[]>((resolve) => {
        return resolve(this._items);
      });
    }

    public get(): Promise<ITodoItem[]> {
        return new Promise<ITodoItem[]>((resolve) => {
            resolve(this._items);
        });
    }
}
