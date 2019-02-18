import React from 'react';
import { Component } from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {IconButton} from "../components/IconButton";
import PostItem from "../components/PostItem";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {IPostSerializer} from "../models";
import {inject, observer} from "mobx-react";
import {ENV_CONSTANTS} from "../constants";

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
@observer
export default class PostListScreen extends Component<IProps> {

    constructor(props: IProps){
        super(props);
        this.getPostList();
    };

    private getPostList = async() => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            const response = await this.props[STORE_NAME]!.axiosStore.get<IPostSerializer[]>('/instagram/posts/', {
                auth: ENV_CONSTANTS.auth
            });
            console.log(response.data);
            this.props[STORE_NAME]!.postStore.setPostList(response.data);
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(this.props[STORE_NAME]!.postStore.postList);
        } catch (error) {
            console.log(error);
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
                <ScrollView>
                {
                    this.props[STORE_NAME]!.postStore.postList.map(post => <PostItem key={post.id} post={post}/>)
                }
                </ScrollView>
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
