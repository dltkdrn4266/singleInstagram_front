import React from 'react'
import { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import PostListScreen from './src/screens/postListScreen';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PostListScreen/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
