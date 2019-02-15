import React from 'react'
import { Component } from 'react';
import { Provider } from 'mobx-react';
import AppNavigator from "./src/Navigator";
import RootStore from "./src/stores/rootStore";

export default class App extends Component {
  public rootStore = new RootStore();

  render() {
    return (
      <Provider rootStore={this.rootStore}>
        <AppNavigator/>
      </Provider>
    );
  }
}
