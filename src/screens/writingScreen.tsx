import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal, Image, TextInput, ToastAndroid} from "react-native";
import {IconButton} from "../components/IconButton";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {ENV_CONSTANTS} from "../constants";
import {inject} from "mobx-react";
import { Base64 } from 'js-base64';

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

interface IState {
    base64Data: string;
    modalVisible: boolean;
    content: string;
    latitude: number;
    longitude: number;
}

@inject(STORE_NAME)
export default class WritingScreen extends Component<IProps,IState> {
    public readonly state: IState = {
        base64Data: '',
        modalVisible: false,
        content: '',
        latitude: 0,
        longitude: 0
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            base64Data: this.props.navigation.getParam('data'),
            modalVisible: false,
            content: '',
            latitude: this.props.navigation.getParam('latitude'),
            longitude: this.props.navigation.getParam('longitude')
        }
    }

    private onPressBackButton = () => {
        this.props.navigation.goBack();
    };

    private onPressShareButton = async() => {
        const response = await this.props[STORE_NAME]!.axiosStore.post(ENV_CONSTANTS.baseURL + '/instagram/posts/', {
            photos: this.state.base64Data,
            content: this.state.content,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }, {
            auth: ENV_CONSTANTS.auth
        })
        console.log(response);
        await this.props[STORE_NAME]!.postStore.getPostList();
        ToastAndroid.show('포스트가 작성되었습니다', ToastAndroid.BOTTOM);
        this.props.navigation.navigate('PostList');
    };

    private onPressImageButton = () => {
        this.setState({
            modalVisible: true
        });
    };

    private makeModalInvisible = () => {
        this.setState({
            modalVisible: false
        });
    };

    private onChangeTextInput = (data: string) => {
        this.setState({
            content: data
        })
    }

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
              <View style={styles.contentView}>
                  <IconButton
                      onPress={this.onPressImageButton}
                      style={styles.icon}
                      iconName={'picture-o'}
                      iconSize={40}
                      iconColor={'black'}
                  />
                  <TextInput style={styles.contentTextInput} placeholder={'문구 입력...'} onChangeText={this.onChangeTextInput}/>
              </View>
              <Modal visible={this.state.modalVisible} transparent={true} onRequestClose={this.makeModalInvisible}>
                  <View style={styles.modalView}>
                      <Image style={{width: '100%', height: '75%'}} source={{uri: 'data:image/png;base64,' + this.state.base64Data}}/>
                  </View>
              </Modal>
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
    modalView: {
        height: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentTextInput: {
        width: 300,
        padding: 8
    }
});


