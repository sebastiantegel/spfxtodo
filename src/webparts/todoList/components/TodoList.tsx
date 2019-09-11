import * as React from 'react';
import styles from './TodoList.module.scss';
import { ITodoListProps } from './ITodoListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITodoItem } from '../../../models/ISPList';

interface ITodoListState {
  todoList: ITodoItem[];
}

export default class TodoList extends React.Component<ITodoListProps, ITodoListState> {
  constructor(props: ITodoListProps) {
    super(props);

    this.state = {
      todoList: this.props.todoItems
    };
  }

  private handleChange(id: number) {
    this.props.changeComplete(id)
      .then(updatedList => {
        this.setState({
          todoList: updatedList
        });
      });
  }

  public render(): React.ReactElement<ITodoListProps> {

    let listItems: JSX.Element[] = [];

    for(let i = 0; i < this.state.todoList.length; i++) {
      if(this.state.todoList[i].Complete) {
        listItems.push(<li key={i} className={ styles.done }><input onChange={this.handleChange.bind(this, this.state.todoList[i].Id)} type="checkbox" defaultChecked /> {this.state.todoList[i].Title}</li>);
      }
      else {
        listItems.push(<li key={i}><input onChange={this.handleChange.bind(this, this.state.todoList[i].Id)} type="checkbox" /> {this.state.todoList[i].Title}</li>);
      }
    }

    return (
      <div className={ styles.todoList }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              {/* <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>

              <p className={ styles.description }>{escape(this.props.description)}</p>

              <p className={ styles.description }>Du har valt: {this.props.numberOfItems}</p> */}

              <ul>
                {listItems}
              </ul>

              {/* <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
