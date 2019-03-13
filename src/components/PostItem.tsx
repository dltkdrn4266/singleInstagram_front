import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Alert, ToastAndroid} from "react-native";
import {IconButton} from "./IconButton";
import {IPostSerializer} from "../models";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {inject} from "mobx-react";
import {ENV_CONSTANTS} from "../constants";
import {CreateTime} from "./CreateTime";
import {NavigationScreenProp} from "react-navigation";

interface IProps extends IStoreInjectedProps{
    post: IPostSerializer;
    navigation: NavigationScreenProp<{}>;
}


@inject(STORE_NAME)
export default class PostItem extends Component <IProps,{}> {

    constructor(props: IProps){
        super(props);
    }


    private onPressProfileButton = () => {
        console.log('press Profile');
    };

    private onPressHeartButton = () => {
        console.log('press Heart');
    };

    private onPressCommentButton = async() => {
        await this.props[STORE_NAME]!.commentStore.getCommentList();

        const result = this.props[STORE_NAME]!.commentStore.commentList.filter(comment =>
            comment.post == this.props.post.id
        );

        this.props.navigation.navigate('Comment', {
            postNumber: this.props.post.id,
            commentList: result
        });
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
            await this.props[STORE_NAME]!.axiosStore.delete('/instagram/posts/' + this.props.post.id + '/',{
                auth: ENV_CONSTANTS.auth
            });
            ToastAndroid.show('포스트가 삭제되었습니다', ToastAndroid.BOTTOM);
            await this.props[STORE_NAME]!.postStore.getPostList();
        }catch (error) {
            console.log(error);
        }
    }


    public render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <TouchableOpacity style={styles.profile} onPress={this.onPressProfileButton}></TouchableOpacity>
                    <Text style={styles.textName}>{this.props.post.user.username}</Text>
                </View>
                <Image style={{width: '100%', height: 400}} source={{uri: this.props.post.photos}}/>
                <View style={styles.iconView}>
                    <IconButton
                        onPress={this.onPressHeartButton}
                        style={styles.iconHeart}
                        iconName={'heart-o'}
                        iconSize={24}
                        iconColor={'black'}
                    />
                    <IconButton
                        onPress={this.onPressCommentButton}
                        style={styles.iconComment}
                        iconName={'comment-o'}
                        iconSize={24}
                        iconColor={'black'}
                    />
                    <IconButton
                        onPress={this.onPressDeleteButton}
                        style={styles.iconComment}
                        iconName={'trash-o'}
                        iconSize={25}
                        iconColor={'black'}
                    />
                </View>
                    {
                        this.props.post.content === '' ? null :
                            <View style={styles.contentView}>
                                <View style={styles.idTextView}>
                                    <Text style={styles.idText}>{this.props.post.user.username}</Text>
                                </View>
                                <View style={styles.contentTextView}>
                                    <Text style={styles.contentText}>{this.props.post.content}</Text>
                                </View>
                            </View>
                    }
                    <CreateTime time={this.props.post.created_at}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
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
    idTextView: {
        justifyContent: 'center',
        marginLeft: 7
    },
    idText: {
        fontFamily: 'NanumSquareB',
        color: 'black',
        fontSize: 14,
    },
    contentTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 7
    },
    contentText: {
        fontSize: 14
    }

})
