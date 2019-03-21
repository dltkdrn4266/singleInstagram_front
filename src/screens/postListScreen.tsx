import React from 'react';
import { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, DatePickerAndroid} from "react-native";
import {IconButton} from "../components/IconButton";
import PostItem from "../components/PostItem";
import {IStoreInjectedProps, STORE_NAME} from "../stores/rootStore";
import {NavigationScreenProp} from "react-navigation";
import {inject, observer} from "mobx-react";
import MapView from 'react-native-maps';

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}
interface IState {
    year: number;
    month: number;
    day: number;
    filterMode: boolean
}

@inject(STORE_NAME)
@observer
export default class PostListScreen extends Component<IProps,IState> {
    public readonly state: IState = {
        year: 0,
        month: 0,
        day: 0,
        filterMode: false
    };

    constructor(props: IProps){
        super(props);
        this.props[STORE_NAME]!.postStore.getPostList();

        const nowDate = new Date();

        this.state = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth(),
            day: nowDate.getDate(),
            filterMode: false
        }
    };

    private onPressPhotoButton = () => {
        this.props.navigation.navigate('Camera');
    };

    private handlePressDatePicker = async () => {
        try {
            const value = await DatePickerAndroid.open({
                date: new Date(
                    this.state.year,
                    this.state.month,
                    this.state.day
                )
            });
            if (value.action !== DatePickerAndroid.dismissedAction) {
                if (
                    value.year !== this.state.year ||
                    value.month !== this.state.month ||
                    value.day !== this.state.day
                ) {
                    await this.setState({
                        year: value.year as number,
                        month: value.month as number,
                        day: value.day as number,
                        filterMode: true
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
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
                <View style={styles.date}>
                    <View style={styles.datePicker}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.handlePressDatePicker}
                        >
                            <Text style={styles.datePickerText}>{`${
                                this.state.year
                                }년 ${this.state.month + 1}월 ${
                                this.state.day
                                }일`}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    <MapView
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
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
    },
    date: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12
    },
    datePicker: {
        flex: 1,
        alignItems: 'center'
    },
    datePickerText: {
        fontFamily: 'NanumSquareR'
    },
});
