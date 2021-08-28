import React from 'react'
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native'
import { btnColor } from '../../utils/theme';
import { TitleText } from '..';

const windowWidth = Dimensions.get('window').width;
const containerWidth = (windowWidth / 2) - 48

const EntertainmentCard = ({ image, text }) => {
    return (
        <View style={{
            width: containerWidth,
            height: 130,
        }}>
            <Image style={{
                width: containerWidth,
                height: 100,
                borderRadius: 10,
                marginBottom: 6
            }}
                source={{ uri: image }} />
            <TitleText text={text} size={14} />
        </View>
    )
}

export default EntertainmentCard
