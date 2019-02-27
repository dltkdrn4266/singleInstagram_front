import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

interface IProps {
    time: string;
}

export class PostTime extends Component<IProps> {
    private getText = (): string => {
        const postDate = new Date(this.props.time);
        const nowDate = new Date();
        const postTime = nowDate.valueOf() - postDate.valueOf();
        const tempDate = new Date(postTime);
        let dateText = '';

        if((tempDate.getFullYear() - 1970) > 0) {
            dateText = `${tempDate.getFullYear() - 1970}년 전`;
        } else if((tempDate.getMonth() - 1)>= 0) {
            dateText = `${tempDate.getMonth() + 1}개월 전`
        } else if((tempDate.getDate() - 1) > 0) {
            dateText = `${tempDate.getHours() - 1}일 전`
        } else if((tempDate.getHours() - 9) > 0) {
            dateText = `${tempDate.getHours() - 9}시간 전`
        } else if(tempDate.getMinutes() == 0) {
            dateText = '방금 전'
        } else {
            dateText = `${tempDate.getMinutes()}분 전`
        }

        return dateText;
    };
    public render() {
        return <Text style={styles.text}>{this.getText()}</Text>;
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'NanumSquareB',
        padding: 8
    }
});
