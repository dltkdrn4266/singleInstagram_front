import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {inject} from "mobx-react";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
export default class CommentScreen extends Component<IProps,{}> {
    constructor(props: IProps){
        super(props);
        this.props[STORE_NAME]!.commentStore.getCommentList();
    }

    public render(){
        return(
            <View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

});