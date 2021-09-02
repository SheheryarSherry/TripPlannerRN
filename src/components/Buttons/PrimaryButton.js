import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { btnColor } from '../../utils/theme'
import { Icon } from 'react-native-elements'
const PrimaryButton = ({ onPress, btnText, isLoading , disabled }) => {
    const width = Dimensions.get('screen').width
    const btnSize = 48
    return (
        <TouchableOpacity 
            onPress={onPress} disabled={isLoading ?true : disabled}>
            <View style={{
                height: btnSize,
                flexDirection: 'row',
                width: width - 48,
                backgroundColor: btnColor,
                borderRadius: btnSize / 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {
                    isLoading ? (
                        <ActivityIndicator size="large"  color='white' />

                    ) :
                        (
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>{btnText}</Text>
                        )
                }

            </View>
        </TouchableOpacity>
    )
}


export default PrimaryButton

const styles = StyleSheet.create({})
