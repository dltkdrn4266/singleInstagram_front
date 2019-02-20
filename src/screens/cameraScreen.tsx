'use strict';
import React from 'react';
import {Component} from 'react';
import {View, Text, StyleSheet, CameraRoll, PermissionsAndroid, ToastAndroid} from "react-native";
import {RNCamera} from "react-native-camera";
import {IconButton} from "../components/IconButton";
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {inject} from "mobx-react";
import {ENV_CONSTANTS} from "../constants";
import {NavigationScreenProp} from "react-navigation";

interface IProps extends IStoreInjectedProps{
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
export default class CameraScreen extends Component<IProps,{}> {


    private camera: RNCamera | null;

    constructor(props: IProps) {
        super(props);
        this.camera = null;
    }

    private requestDirectoryPermission = async () => {
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
        } catch (err) {
            console.log(err);
        }
    };

    private takePicture = async() => {
        await this.requestDirectoryPermission();
        if (this.camera) {
            const options = { quality: 0.5, base64: false, fixOrientation: true };
            const data = await this.camera.takePictureAsync(options);
            await CameraRoll.saveToCameraRoll(data.uri);
        }
    };

    private postImagePicker = async() => {
        try {
            const images = await ImagePicker.openPicker({
                width: 960,
                height: 1280,
                cropping: true,
                multiple: true,
            });
            const imageArray = images as Image[];
            if (imageArray.length > 0){
                for(const image in imageArray){
                    const data = new FormData();
                    const blob = new File([imageArray[image].data!],'test',{type: imageArray[image].mime});
                    console.log('blob');
                    console.log(blob);
                    data.append('photos', blob);
                    // data.append('photos', {
                    //     uri: imageArray[image].path,
                    //     type: imageArray[image].mime,
                    //     name: 'test'
                    // });
                    const response = await this.props[STORE_NAME]!.axiosStore.post('/instagram/posts/',{
                        photos: data
                    },{
                        auth: ENV_CONSTANTS.auth
                    });
                    console.log(response.data);
                    await this.props[STORE_NAME]!.postStore.getPostList();
                    this.props.navigation.goBack();
                    ToastAndroid.show('포스트가 작성되었습니다', ToastAndroid.BOTTOM);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    public render(){
        return(
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', width: 420}}>
                    <IconButton
                        onPress={this.takePicture}
                        style={styles.capture}
                        iconName={'camera'}
                        iconSize={24}
                        iconColor={'black'}
                    />
                    <IconButton
                        onPress={this.postImagePicker}
                        style={styles.capture}
                        iconName={'photo'}
                        iconSize={24}
                        iconColor={'black'}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
})