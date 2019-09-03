import { ITodoItem } from './../models/ISPList';

export default class MockHttpClient  {

    private static _items: ITodoItem[] = [{ Title: 'Gå ut med hunden', Complete: true },
                                        { Title: 'Handla mat', Complete: false },
                                        { Title: 'Spring 10 km', Complete: false }];

    public constructor() {

    }

    public changeComplete(i: number) {
      alert("Changed value from " + MockHttpClient._items[i].Complete + " to " + !MockHttpClient._items[i].Complete);
      MockHttpClient._items[i].Complete = !MockHttpClient._items[i].Complete;
    }

    public static get(): Promise<ITodoItem[]> {
        return new Promise<ITodoItem[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}
