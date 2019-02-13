import React from 'react';
import {Component} from 'react';
import {View,StyleSheet,Text,Image} from "react-native";
import {IconButton} from "./IconButton";

export default class PostItem extends Component{
    private onPressProfileButton = () => {
        console.log('press Profile');
    };

    public render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <IconButton onPress={this.onPressProfileButton} style={styles.profile} iconName={"chevron-right"} iconSize={30} iconColor={"#01a699"}/>
                    <Text style={styles.textName}>   이름이름이름이름이름</Text>
                </View>
                <Image style={{width: '100%', height: 400}} source={{uri: 'http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg'}}/>
                <View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    test: {
        borderWidth: 1
    },
    title: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10
    },
    textName: {
        fontSize: 13
    },
    profile: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: 30,
        height: 30,
        backgroundColor:'#fff',
        borderRadius:100,
    }
})
