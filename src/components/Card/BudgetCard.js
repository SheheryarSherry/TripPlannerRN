import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { btnColor, defaultPadding, greyTextColor } from '../../utils/theme';
import { TitleText, SubtitleText } from '..';
import { Icon } from 'react-native-elements'

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 48

const BudgetCardItem = ({ planData }) => {

    const {
        budget,
        type
        } = planData
    const min = budget !=null ? budget.split('-')[0] : ''
    const max = budget !=null ? budget.split('-')[1] : ''
    return (
        <View style={{
            // backgroundColor: btnColor,
            width: containerWidth /1.8,
            height: 150,
            marginBottom: 10
        }}>
            

            <View style={{
                flexDirection: 'row',
                marginTop: defaultPadding / 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    height: 100,
                    borderColor: greyTextColor,
                    borderWidth: 1,
                    marginStart: 5,
                    marginEnd: defaultPadding / 2,
                }}
                ></View>
                <ImageBackground
                    style={{
                        width: containerWidth / 2,
                        height: 100,
                        borderRadius: 10,
                        flex: 1
                    }}
                    imageStyle={{
                        borderRadius: 10,
                        position: 'relative'
                    }}
                    source={{ uri: 'https://images.pexels.com/photos/2412711/pexels-photo-2412711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }} >
                    <View style={
                        {
                            width: containerWidth / 2,
                            flexDirection:'column',
                            height: 100,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            position: 'absolute',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 19,
                            fontWeight: 'bold'
                        }}>{type}</Text>
                         <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>PKR: {budget!=null?(Number(min).toFixed(0)+" - "+ Number(max).toFixed(0)):'--'}</Text>
                    </View>
                    
                       
                </ImageBackground>

           
            </View>
        </View>
        // <TouchableOpacity
        //     onPress={() => navigation.navigate('Plan')}>

        // </TouchableOpacity>
    )
}

export default BudgetCardItem

const styles = StyleSheet.create({})
