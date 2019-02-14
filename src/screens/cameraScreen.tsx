'use strict';
import React from 'react';
import {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {RNCamera} from "react-native-camera";
import {IconButton} from "../components/IconButton";

export default class CameraScreen extends Component {


    private camera: RNCamera | null;

    constructor(props: {}) {
        super(props);
        this.camera = null;
    }

    public takePicture = async() => {
        if (this.camera) {
            const options = { quality: 0.5, base64: false };
            const data = await this.camera.takePictureAsync(options );
            console.log(data.uri);
        }
    };
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
                    <IconButton onPress={this.takePicture} style={styles.capture} iconName={'camera'} iconSize={24} iconColor={'black'}/>
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