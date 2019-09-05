import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'TodoListWebPartStrings';
import TodoList from './components/TodoList';
import { ITodoListProps } from './components/ITodoListProps';
import { ITodoItem } from '../../models/ISPList';
import MockHttpClient from '../../services/dataService';

export interface ITodoListWebPartProps {
  description: string;
  workDone: boolean;
  showNumberOfItems: number;
}

export default class TodoListWebPart extends BaseClientSideWebPart<ITodoListWebPartProps> {
  public render(): void {
    let service = new MockHttpClient();

    //Gör anrop (i detta fall till MockDataService)
    service.get()

      // När anropet är klart (kan ta flera sekunder), gör följande
      .then(todos => {

        // Logga resultate
        console.log(todos);

        // Skapa upp react-komponenten och skicka med de props som behövs
        const element: React.ReactElement<ITodoListProps > = React.createElement(
          TodoList,
          {
            // Sätt egenskaperna i props-objektet
            description: this.properties.description,
            numberOfItems: this.properties.showNumberOfItems,

            // Använd resultatet från anropet till att ge spLists
            // det värde som kom från SharePoint
            todoItems: todos,

            changeComplete: service.changeComplete
          }
        );

        ReactDom.render(element, this.domElement);
      });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneCheckbox('workDone', {
                  text: 'Markera som klar'
                }),
                PropertyPaneSlider('showNumberOfItems', {
                  label: 'Välj antal',
                  min: 1,
                  max: 20,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
