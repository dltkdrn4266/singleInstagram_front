import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput, Button, ToastAndroid, ActivityIndicator} from "react-native";
import {inject, observer} from "mobx-react";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {ICommentSerializer} from "../models";
import CommentItem from "../components/CommentItem";
import {ENV_CONSTANTS} from "../constants";
import {IconButton} from "../components/IconButton";

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
        this.props[STORE_NAME]!.loadingStore.startLoading();
        const response = await this.props[STORE_NAME]!.axiosStore.post(ENV_CONSTANTS.baseURL + '/instagram/comments/', {
            post: this.state.postNumber,
            content: this.state.content
        }, {
            auth: ENV_CONSTANTS.auth
        })
        
        await this.commentFilter();
        this.props[STORE_NAME]!.loadingStore.endLoading();
        ToastAndroid.show('댓글이 등록되었습니다',ToastAndroid.BOTTOM);

        this.setState({
            content: ''
        })
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

    private onPressBackButton = () => {
        this.props.navigation.goBack();
    };

    public render(){
        return(
            <View style={styles.root}>
                <View style={styles.title}>
                    <IconButton
                        onPress={this.onPressBackButton}
                        style={styles.icon}
                        iconName={'long-arrow-left'}
                        iconSize={25}
                        iconColor={'black'}/>
                    <Text style={styles.titleText}>댓글</Text>
                </View>
                {this.props[STORE_NAME]!.loadingStore.isLoading ?
                    <View style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size={45} color="#0000ff"/>
                    </View> :
                    <ScrollView>
                        {
                            this.state.comments.length > 0 ?
                                this.state.comments.map(comment =>
                                    <CommentItem key={comment.id} comment={comment}/>
                                ) :
                                <View style={styles.noCommentView}>
                                    <Text>등록된 댓글이 없습니다.</Text>
                                </View>
                        }
                    </ScrollView>
                }
                <View style={styles.commentWriteView}>
                    <TextInput value={this.state.content} placeholder={'댓글 달기'} onChangeText={this.onChangeTextContent}/>
                    <Button title={'게시'} onPress={this.onPressPostButton}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        height: 720
    },
    icon: {
        padding: 10
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        borderTopWidth: 0
    },
    titleText: {
        fontFamily: 'NanumSquareR',
        fontSize: 22,
    },
    noCommentView: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    commentWriteView: {
        height: '20%',
        bottom: 0,
        flexDirection: 'column'
    }
});