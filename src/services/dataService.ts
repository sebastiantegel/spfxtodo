import { ITodoItem } from './../models/ISPList';

export default class MockHttpClient  {

    private _items: ITodoItem[];

    public constructor() {
      this._items = [{ Title: 'Gå ut med hunden', Complete: true },
                     { Title: 'Handla mat', Complete: false },
                     { Title: 'Spring 10 km', Complete: false }];

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
