import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Alert} from "react-native";
import {IconButton} from "./IconButton";
import {IPostSerializer} from "../models";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";

interface IProps extends IStoreInjectedProps{
    post: IPostSerializer;
}

export default class PostItem extends Component <IProps,{}> {
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
                    style: 'cancel',
                },
                {text: '확인', onPress: this.deletePost}
            ]
        );
    };

    private deletePost = async() => {
        try{
            const response = await this.props[STORE_NAME]!.axiosStore.delete('/instagram/posts/');
        }catch (error) {
            console.log(error);
        }
    }


    public render(){
        console.log(this.props.post.photos);
        console.log(this.props.post.id);
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <TouchableOpacity style={styles.profile} onPress={this.onPressProfileButton}></TouchableOpacity>
                    <Text style={styles.textName}>{this.props.post.user.username}</Text>
                </View>
                <Image style={{width: '100%', height: 400}} source={{uri: this.props.post.photos}}/>
                <View style={styles.iconView}>
                    <IconButton onPress={this.onPressHeartButton} style={styles.iconHeart} iconName={'heart-o'} iconSize={24} iconColor={'black'}/>
                    <IconButton onPress={this.onPressCommentButton} style={styles.iconComment} iconName={'comment-o'} iconSize={24} iconColor={'black'}/>
                    <IconButton onPress={this.onPressDeleteButton} style={styles.iconComment} iconName={'trash-o'} iconSize={25} iconColor={'black'}/>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.idText}>{this.props.post.user.username}</Text>
                    <View style={styles.contentTextView}>
                        <Text style={styles.contentText}>{this.props.post.content}</Text>
                    </View>
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
        fontSize: 13,
        padding: 10
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
    },
    contentView: {
        flexDirection: 'row',
    },
    idText: {
        marginLeft: 7,
        fontFamily: 'NanumSquareB',
        color: 'black',
        fontSize: 14
    },
    contentTextView: {
        alignItems: 'center'
    },
    contentText: {
        marginLeft: 7,
        fontSize: 14
    }

})
