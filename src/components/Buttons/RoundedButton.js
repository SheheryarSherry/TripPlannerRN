import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { btnColor } from '../../utils/theme'


const RoundedButton = ({ style, size = 36, onPress, icon = "add", bgColor = btnColor }) => {
    const btnSize = size
    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={{
                height: btnSize,
                width: btnSize,
                backgroundColor: bgColor,
                borderRadius: btnSize / 2,
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }}>
                <Icon
                    name={icon}
                    color='#ffffff' />
            </View>
        </TouchableOpacity>
    )
}

export default RoundedButton

const styles = StyleSheet.create({})
