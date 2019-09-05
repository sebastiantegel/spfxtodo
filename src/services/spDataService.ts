import { ITodoItem } from '../models/ISPList';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class SPDataService  {

    private _httpClient: SPHttpClient;
    private _url: string;
    private _listTitle: string;

    public constructor(httpClient: SPHttpClient, url: string, listTitle: string) {
      this._httpClient = httpClient;
      this._url = url;
      this._listTitle = listTitle;

      this.changeComplete = this.changeComplete.bind(this);
    }

    public changeComplete(i: number) : Promise<ITodoItem[]> {
      return new Promise<ITodoItem[]>((resolve) => {

      });
    }

    public get(): Promise<ITodoItem[]> {
      return this._httpClient.get(this._url + `/_api/web/lists/getbytitle('${this._listTitle}')/items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        console.log(response);

        return response.json()
          .then(jsonResult => {
            console.log(jsonResult.value);

            let todoListItem: ITodoItem[] = jsonResult.value.map(item => {
              return { Title: item.Title, Complete: item.Completed };
            });

            return todoListItem;
          });
      });
    }
}
