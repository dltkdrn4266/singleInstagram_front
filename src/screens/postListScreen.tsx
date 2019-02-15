import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import {IconButton} from "../components/IconButton";
import PostItem from "../components/PostItem";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {IPostSerializer} from "../models";
import {inject} from "mobx-react";

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
export default class PostListScreen extends Component<IProps> {

    constructor(props: IProps){
        super(props);
        this.getPostList();
    };

    private getPostList = async() => {
        try {
            const response = await this.props[STORE_NAME]!.axiosStore.get<IPostSerializer[]>('/instagram/posts/', {
                auth: {
                    "username": "sanggulee",
                    "password": "l5254266"
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log('에러임에러임 ㅠㅠ');
            console.log(error);
            // console.log(JSON.stringify(error, null, 2));
        }
    };

    private onPressPhotoButton = () => {
        this.props.navigation.navigate('Camera');
    };

    public render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <IconButton onPress={this.onPressPhotoButton} style={styles.icon} iconName={'camera'} iconSize={25} iconColor={'black'}/>
                    <Text style={styles.titleText}>Instagram</Text>
                </View>
                <PostItem/>
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
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 45,
        elevation: 5
    },
    titleText: {
        fontFamily: 'NanumSquareR',
        fontSize: 22,
    },
    icon: {
        padding: 10
    }
})
