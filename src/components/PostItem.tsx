import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Alert} from "react-native";
import {IconButton} from "./IconButton";

export default class PostItem extends Component{
    private onPressProfileButton = () => {
        console.log('press Profile');
    };

    private onPressHeartButton = () => {
        console.log('press Heart');
    };

    private onPressCommentButton = () => {
        console.log('press Comment');
    };

    private onPressDeleteButton = () => {
        Alert.alert(
            '삭제',
            '해당 글을 삭제하시겠습니까?',
            [
                {   
                    text: '취소',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: '확인', onPress: () => console.log('OK Pressed')},
            ]
        );
    }


    public render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.title}>
                    <TouchableOpacity style={styles.profile} onPress={this.onPressProfileButton}></TouchableOpacity>
                    <Text style={styles.textName}>   dltkdrn4266</Text>
                </View>
                <Image style={{width: '100%', height: 400}} source={{uri: 'http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg'}}/>
                <View style={styles.iconView}>
                    <IconButton onPress={this.onPressHeartButton} style={styles.iconHeart} iconName={'heart-o'} iconSize={24} iconColor={'black'}/>
                    <IconButton onPress={this.onPressCommentButton} style={styles.iconComment} iconName={'comment-o'} iconSize={24} iconColor={'black'}/>
                    <IconButton onPress={this.onPressDeleteButton} style={styles.iconComment} iconName={'trash-o'} iconSize={25} iconColor={'black'}/>
                </View>
            </ScrollView>
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
    },
    iconView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconHeart: {
        padding: 8,
    },
    iconComment: {
        padding: 6,
    }
})
