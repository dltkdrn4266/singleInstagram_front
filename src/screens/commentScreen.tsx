import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Button, ToastAndroid} from "react-native";
import {inject, observer} from "mobx-react";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {ICommentSerializer} from "../models";
import CommentItem from "../components/CommentItem";
import {Base64} from "js-base64";
import {ENV_CONSTANTS} from "../constants";

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

interface IState {
    postNumber: number
    comments: ICommentSerializer[],
    content: string
}

@inject(STORE_NAME)
@observer
export default class CommentScreen extends Component<IProps,IState> {
    public readonly state: IState = {
        postNumber: this.props.navigation.getParam('postNumber'),
        comments: this.props.navigation.getParam('commentList'),
        content: ''
    };

    constructor(props: IProps){
        super(props);

        this.state = {
            postNumber: this.state.postNumber,
            comments: this.state.comments,
            content: this.state.content
        }
    }

    private onChangeTextContent = (data: string) => {
        this.setState({
            content: data
        })
    };

    private onPressPostButton = async() => {
        const data = new FormData();
        data.append('Post', this.state.postNumber);
        data.append('Content', this.state.content);
        const headers = new Headers();
        headers.append('Authorization', 'basic ' + Base64.encode("sanggulee:l5254266"));
        const response = await fetch(ENV_CONSTANTS.baseURL + '/instagram/comments/', {
            method: 'post',
            body: data,
            headers: headers
        });
        console.log(response);
        ToastAndroid.show('댓글이 등록되었습니다',ToastAndroid.BOTTOM);
    };

    private commentFilter = async () => {
        await this.props[STORE_NAME]!.commentStore.getCommentList();

        const result = this.props[STORE_NAME]!.commentStore.commentList.filter(comment =>
            comment.post == this.state.postNumber
        );

        this.setState({
            comments: result
        })
    };

    public render(){
        return(
            <View style={styles.root}>
                <ScrollView>
                    {
                        this.state.comments.length > 0 ?
                            this.props[STORE_NAME]!.commentStore.commentList.map(comment =>
                                <CommentItem key={comment.id} comment={comment}/>
                            ) :
                            <View style={styles.noCommentView}>
                                <Text>등록된 댓글이 없습니다.</Text>
                            </View>
                    }
                </ScrollView>
                <View style={styles.commentWriteView}>
                    <TextInput style={styles.textInput} placeholder={'댓글 달기'} onChangeText={this.onChangeTextContent}/>
                    <Button title={'게시'} onPress={this.onPressPostButton}/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        height: 760
    },
    noCommentView: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 10
    },
    textInput: {
    },
    commentWriteView: {
        height: '20%',
        bottom: 0,
        flexDirection: 'column'
    }
});