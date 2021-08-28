import React from 'react'
import { View, Text } from 'react-native'
import { blueColor } from '../../utils/theme'

const TabbarMenu = ({ onPress, textMenu, isSelectedMenu }) => {
    let isSelected = isSelectedMenu
    return (

        <View style={{ marginEnd: 15 }}>

            <Text style={{
                fontWeight: 'bold',
                color: isSelected ? blueColor : 'grey'
            }}>{textMenu}</Text>

            <View style={{
                marginTop: 5,
                height: 2,
                borderRadius: 1,
                backgroundColor: isSelected ? blueColor : 'transparent'
            }} />
        </View>
    )
}

export default TabbarMenu
