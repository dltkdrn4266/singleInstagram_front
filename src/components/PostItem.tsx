import React from 'react';
import {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Alert, ToastAndroid, Modal} from "react-native";
import {IconButton} from "./IconButton";
import {IPostSerializer} from "../models";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {inject} from "mobx-react";
import {ENV_CONSTANTS} from "../constants";
import {CreateTime} from "./CreateTime";
import {NavigationScreenProp} from "react-navigation";
import MapView, { Marker, LatLng } from 'react-native-maps';


interface IState {
    modalVisible: boolean;
    coordinate: LatLng;
}

interface IProps extends IStoreInjectedProps{
    post: IPostSerializer;
    navigation: NavigationScreenProp<{}>;
}


@inject(STORE_NAME)
export default class PostItem extends Component <IProps,IState> {

    public readonly state: IState = {
        modalVisible: false,
        coordinate: {
            latitude: this.props.post.latitude,
            longitude: this.props.post.longitude,
        }
    };

    constructor(props: IProps){
        super(props);
    }


    private onPressProfileButton = () => {
        console.log('press Profile');
    };

    private onPressHeartButton = async() => {
        try{
            const data = new FormData();
            data.append('like', !this.props.post.like);
            const headers = new Headers();
            headers.append('Authorization', 'basic ' + Base64.encode("sanggulee:l5254266"));
            const response = await fetch(ENV_CONSTANTS.baseURL + '/instagram/posts/' + this.props.post.id + '/', {
                method: 'PATCH',
                body: data,
                headers: headers
            });
            this.props[STORE_NAME]!.postStore.getPostList();
        } catch (e) {
            console.log(e);
        }
    };

    private onPressShowMapButton = () => {
        this.setState({
            modalVisible: true
        })
    };

    private onPressCommentButton = async() => {
        await this.props[STORE_NAME]!.commentStore.getCommentList();

        const result = this.props[STORE_NAME]!.commentStore.commentList.filter(comment =>
            comment.post == this.props.post.id
        );

        this.props.navigation.navigate('Comment', {
            postNumber: this.props.post.id,
            commentList: result
        });
    };

    private onPressDeleteButton = () => {
        Alert.alert(
            '삭제',
            '해당 글을 삭제하시겠습니까?',
            [
                {   
                    text: '취소',
                    style: 'cancel',
                },
                {text: '확인', onPress: this.deletePost}
            ]
        );
    };

    private deletePost = async() => {
        try{
            await this.props[STORE_NAME]!.axiosStore.delete('/instagram/posts/' + this.props.post.id + '/',{
                auth: ENV_CONSTANTS.auth
            });
            ToastAndroid.show('포스트가 삭제되었습니다', ToastAndroid.BOTTOM);
            await this.props[STORE_NAME]!.postStore.getPostList();
        }catch (error) {
            console.log(error);
        }
    };

    private modalOnRequestClose = () => {
        this.setState({
            modalVisible: false
        });
    };

    public render(){
        return(
            <View style={styles.container}>
                <Modal visible={this.state.modalVisible} onRequestClose={this.modalOnRequestClose}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.props.post.latitude,
                            longitude: this.props.post.longitude,
                            latitudeDelta: 0.0422,
                            longitudeDelta: 0.0421,
                        }}
                    >
                    <Marker coordinate={this.state.coordinate}/>
                    </MapView>
                </Modal>
                <View style={styles.title}>
                    <TouchableOpacity style={styles.profile} onPress={this.onPressProfileButton}></TouchableOpacity>
                    <Text style={styles.textName}>{this.props.post.user.username}</Text>
                </View>
                <Image style={{width: '100%', height: 400}} source={{uri: this.props.post.photos}}/>
                <View style={styles.iconView}>
                { this.props.post.like ? 
                    <IconButton
                        onPress={this.onPressHeartButton}
                        style={styles.iconHeart}
                        iconName={'heart-o'}
                        iconSize={24}
                        iconColor={'black'}
                    /> :
                    <IconButton
                        onPress={this.onPressHeartButton}
                        style={styles.iconHeart}
                        iconName={'heart'}
                        iconSize={24}
                        iconColor={'black'}
                    />
                }
                    <IconButton
                        onPress={this.onPressCommentButton}
                        style={styles.iconComment}
                        iconName={'comment-o'}
                        iconSize={24}
                        iconColor={'black'}
                    />
                    <IconButton
                        onPress={this.onPressDeleteButton}
                        style={styles.iconComment}
                        iconName={'trash-o'}
                        iconSize={25}
                        iconColor={'black'}
                    />
                    <IconButton
                        onPress={this.onPressShowMapButton}
                        style={styles.iconHeart}
                        iconName={'map-marker'}
                        iconSize={24}
                        iconColor={'black'}
                    />
                </View>
                    {
                        this.props.post.content === '' ? null :
                            <View style={styles.contentView}>
                                <View style={styles.idTextView}>
                                    <Text style={styles.idText}>{this.props.post.user.username}</Text>
                                </View>
                                <View style={styles.contentTextView}>
                                    <Text style={styles.contentText}>{this.props.post.content}</Text>
                                </View>
                            </View>
                    }
                    <CreateTime time={this.props.post.created_at}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    test: {
        borderWidth: 1
    },
    title: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10
    },
    textName: {
        fontSize: 13,
        padding: 10
    },
    profile: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width: 30,
        height: 30,
        backgroundColor:'#fff',
        borderRadius:100,
    },
    iconView: {
        flexDirection: 'row',
    },
    iconHeart: {
        padding: 8,
    },
    iconComment: {
        padding: 6,
    },
    contentView: {
        flexDirection: 'row',
    },
    idTextView: {
        justifyContent: 'center',
        marginLeft: 7
    },
    idText: {
        fontFamily: 'NanumSquareB',
        color: 'black',
        fontSize: 14,
    },
    contentTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 7
    },
    contentText: {
        fontSize: 14
    },
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    }
});
