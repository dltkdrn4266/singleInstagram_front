import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity,Modal} from "react-native";
import {IconButton} from "../components/IconButton";
import {IStoreInjectedProps} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import ImageViewer from 'react-native-image-zoom-viewer';

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

interface IState {
    base64Data: string,
    modalVisible: boolean
}

export default class WritingScreen extends Component<IProps,{}> {
    public readonly state: IState = {
        base64Data: '',
        modalVisible: false
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            base64Data: this.props.navigation.getParam('data'),
            modalVisible: false
        }
    }

    private onPressBackButton = () => {
        this.props.navigation.goBack();
    };

    private onPressShareButton = () => {
        console.log('share press');
    };

    private onPressImageButton = () => {

    };

    public render(){
        return(
          <View>
              <View style={styles.header}>
                  <View style={styles.title}>
                      <IconButton
                          onPress={this.onPressBackButton}
                          style={styles.icon}
                          iconName={'long-arrow-left'}
                          iconSize={25}
                          iconColor={'black'}/>
                      <Text style={styles.titleText}>새 게시물</Text>
                  </View>
                  <TouchableOpacity style={{padding: 10}} onPress={this.onPressShareButton}>
                      <Text style={{color: 'blue', fontSize: 15,opacity: 0.7}}>공유</Text>
                  </TouchableOpacity>
              </View>
              <IconButton
                  onPress={this.onPressImageButton}
                  style={styles.icon}
                  iconName={'picture-o'}
                  iconSize={40}
                  iconColor={'black'}/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 45,
        elevation: 5,
        alignItems: 'center'
    },
    icon: {
        padding: 10
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'NanumSquareR',
        fontSize: 22,
    },
});


