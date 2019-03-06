import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView, Button} from "react-native";
import {inject, observer} from "mobx-react";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {ICommentSerializer} from "../models";
import CommentItem from "../components/CommentItem";
import PostItem from "../components/PostItem";

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

interface IState {
    postNumber?: number
    comments: ICommentSerializer[]
}

@inject(STORE_NAME)
@observer
export default class CommentScreen extends Component<IProps,IState> {
    public readonly state: IState = {
        postNumber: this.props.navigation.getParam('postNumber'),
        comments: this.props.navigation.getParam('commentList')
    };

    constructor(props: IProps){
        super(props);

        this.state = {
            postNumber: this.state.postNumber,
            comments: this.state.comments
        }
    }

    private commentFilter = async () => {
        await this.props[STORE_NAME]!.commentStore.getCommentList();

        const result = this.props[STORE_NAME]!.commentStore.commentList.filter(comment =>
            comment.postNumber == this.state.postNumber
        );

        this.setState({
            comments: result
        })
    };

    public render(){
        return(
            <View>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noCommentView: {
        alignItems: 'center'
    }
});