import React, {Component} from 'react';
import {View,Text,StyleSheet} from "react-native";
import {IStoreInjectedProps} from "../stores/rootStore";
import {ICommentSerializer} from "../models";

interface IProps extends IStoreInjectedProps{
    comment: ICommentSerializer
}

export default class CommentItem extends Component<IProps,{}> {
    public render() {
        return(
            <View style={styles.commentView}>
                <Text>test</Text>
                <Text>{this.props.comment.content}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {

    },
    commentView: {
        display: 'flex',
        flexDirection: 'row',
    }
});