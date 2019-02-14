import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import {IconButton} from "../components/IconButton";
import PostItem from "../components/PostItem";
import {IStoreInjectedProps} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}


export default class PostListScreen extends Component<IProps> {
    private onPressPhotoButton = () => {
        this.props.navigation.navigate('Camera');
    }

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
