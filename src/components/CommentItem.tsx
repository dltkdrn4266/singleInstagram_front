import React, {Component} from 'react';
import {View,Text,StyleSheet} from "react-native";
import {IStoreInjectedProps} from "../stores/rootStore";
import {ICommentSerializer} from "../models";
import {CreateTime} from "./CreateTime";

interface IProps extends IStoreInjectedProps{
    comment: ICommentSerializer
}

export default class CommentItem extends Component<IProps,{}> {
    public render() {
        return(
            <View style={styles.commentView}>
                <View style={styles.textView}>
                    <Text style={styles.textName}>test</Text>
                    <Text style={styles.textContent}>{this.props.comment.content}</Text>
                </View>
                <CreateTime time={this.props.comment.created_at}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textName: {
        fontFamily: 'NanumSquareB',
        fontSize: 15,
        padding: 10,

    },
    textContent: {
        fontFamily: 'NanumSquareR',
        fontSize: 15,
        padding: 10
    },
    textView: {
        flexDirection: 'row',
    },
    commentView: {
        display: 'flex',
        flexDirection: 'column',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
});