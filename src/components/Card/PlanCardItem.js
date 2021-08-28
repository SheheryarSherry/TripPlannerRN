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

const PlanCardItem = ({ planData }) => {

    const {
        date,
        tripName,
        origin,
        destination,
        rooms ,
        } = planData

    return (
        <View style={{
            // backgroundColor: btnColor,
            width: containerWidth,
            height: 150,
            marginBottom: 10
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{
                    width: 12,
                    height: 12,
                    borderRadius: 12 / 2,
                    marginEnd: 12,
                    backgroundColor: '#b0d1ff'
                }}>

                </View>
                <TitleText text={'From '+origin} size={14} />
            </View>

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
                            height: 100,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            position: 'absolute',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 24,
                            fontWeight: 'bold'
                        }}>{destination}</Text>
                    </View>
                </ImageBackground>

                {/* Detail Plan */}
                <View style={{
                    flex: 1,
                    marginStart: defaultPadding * 2,
                    alignItems: 'flex-start',
                }}>
                    {/* PLACE TITLE */}
                    <TitleText text={tripName} size={18} />
                    {/* PLACE TEXT */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5
                    }}>
                        <Icon name='hotel' size={14} color='#b1b1b1' />
                        <SubtitleText isMarginLeft text={rooms+ (rooms<2?' Room':'Rooms')} size={14} />
                    </View>
                    {/* PHONE TEXT */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5
                    }}>
                        <Icon name="phone" size={14} color='#b1b1b1' />
                        <SubtitleText isMarginLeft text={'+92 313-------'} size={14} />
                    </View>
                </View>
            </View>
        </View>
        // <TouchableOpacity
        //     onPress={() => navigation.navigate('Plan')}>

        // </TouchableOpacity>
    )
}

export default PlanCardItem

const styles = StyleSheet.create({})
