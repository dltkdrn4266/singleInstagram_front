import React from 'react';
import { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import {IconButton} from "../components/IconButton";
import PostItem from "../components/PostItem";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {inject, observer} from "mobx-react";

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
@observer
export default class PostListScreen extends Component<IProps> {

    constructor(props: IProps){
        super(props);
        this.props[STORE_NAME]!.postStore.getPostList();
    };

    private onPressPhotoButton = () => {
        this.props.navigation.navigate('Camera');
    };

    public render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <IconButton
                            onPress={this.onPressPhotoButton}
                            style={styles.icon}
                            iconName={'camera'}
                            iconSize={25}
                            iconColor={'black'}/>
                        <Text style={styles.titleText}>Instagram</Text>
                    </View>
                </View>
                {this.props[STORE_NAME]!.loadingStore.isLoading ?
                    <View style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size={45} color="#0000ff" />
                    </View> :
                    <ScrollView>
                        {
                            this.props[STORE_NAME]!.postStore.postList.length > 0 ?
                                this.props[STORE_NAME]!.postStore.postList.map(post =>
                                    <PostItem key={post.id} navigation={this.props.navigation} post={post}/>
                                ) :
                                <View style={styles.noPostView}>
                                    <Text>등록된 포스트가 없습니다.</Text>
                                </View>
                        }
                    </ScrollView>
                }
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 45,
        elevation: 5
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'NanumSquareR',
        fontSize: 22,
    },
    icon: {
        padding: 10
    },
    noPostView: {
        alignItems: 'center'
    }
});
