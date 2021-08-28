import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { greyTextColor, titleTextColor } from '../../utils/theme'

const TitleText = ({ text, size = 28 }) => {
    return (
        <View>
            <Text
                style={{
                    color: titleTextColor,
                    fontSize: size,
                    fontWeight: 'bold'
                }}>
                {text}</Text>
        </View>
    )
}

TitleText.propTypes = {
    size: PropTypes.number

}

const SubtitleText = ({ text, size = 18, isMarginLeft = false }) => {
    return (
        <View>
            <Text
                style={{
                    color: greyTextColor,
                    fontSize: size,
                    fontWeight: 'bold',
                    marginLeft: isMarginLeft ? 6 : 0
                }}>
                {text}
            </Text>
        </View>
    )
}
SubtitleText.propTypes = {
    size: PropTypes.number

}

export { TitleText, SubtitleText }

