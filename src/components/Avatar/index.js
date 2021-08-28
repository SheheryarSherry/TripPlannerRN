import React from 'react'
import { Image, Dimensions } from 'react-native'
import { defaultPadding } from '../../utils/theme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Avatar = ({ image, styles }) => {
    return (
        <Image style={{
            width: windowWidth / 7.5,
            height: windowWidth / 7.5,
            borderRadius: 25,
            ...styles
        }}
            source={{ uri: image }} />
    )
}

export default Avatar
