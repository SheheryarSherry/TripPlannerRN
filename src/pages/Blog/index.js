import React from 'react'
import { StyleSheet, Image, Text, View, Dimensions, ImageBackground, ScrollView } from 'react-native'
import { defaultBackground, defaultPadding, blueColor, btnColor } from '../../utils/theme';
import { RoundedButton, TitleText, SubtitleText, Avatar, EntertainmentCard, PrimaryButton } from '../../components';
import BudgetCard from '../../components/Card/BudgetCard'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { WebView } from 'react-native-webview';



const Blog = ({ navigation, route }) => {

    const {
        heading,
        image,
        html
    } = route.params

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flexDirection: 'column',
                height: windowHeight,
            }}>
            <ImageBackground
                style={{
                    height: windowHeight / 2,
                    justifyContent: 'flex-end',
                    position: 'relative'
                }}
                source={{ uri: image }}>

                {/* DARK OPACITY FOREGROUND IMAGE */}
                <View style={{
                    width: windowWidth,
                    height: windowHeight,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                </View>

                {/* 3 BTN DETAIL */}
                <View style={{
                    paddingHorizontal: defaultPadding,
                    paddingBottom: defaultPadding / 2,
                    flexDirection: 'row',
                    bottom: 20,
                    position: 'absolute'
                }}>
                    {/* <RoundedButton style={{ marginEnd: 10 }} icon='info' bgColor={blueColor} />
                    <RoundedButton style={{ marginHorizontal: 10 }} icon='weekend' bgColor={blueColor} /> */}
                </View>

                {/* Border Bottomsheet */}
                <View style={{
                    height: 20,
                    backgroundColor: defaultBackground,
                    borderTopStartRadius: 30,
                    borderTopEndRadius: 30,
                    bottom: 0,
                }} />

                <View style={{
                    position: 'absolute',
                    top: 0,
                    padding: defaultPadding,
                    width: windowWidth,
                    height: windowHeight,
                }}>
                    {/* Back Button */}
                    <View style={{
                        width: 36,
                        height: 36
                    }}>
                        <RoundedButton onPress={() => navigation.goBack()} icon='arrow-back' bgColor={blueColor} />
                    </View>
                    {/* Date text */}
                    <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                        top: 40,
                    }}>{ }</Text>
                    {/* City text */}
                    <Text style={{
                        color: 'white',
                        fontSize: 48,
                        fontWeight: 'bold',
                        top: 40,
                    }}>{heading}</Text>

                </View>
            </ImageBackground>
            <View
                style={{
                    backgroundColor: defaultBackground,
                }}>
               

                {/* HORIZONTAL AVATAR SECTION */}
                <View style={{ marginTop: 10 }}>
                <WebView 
                    source={{ html: html }}
                    style={{ marginTop: 0, height:windowWidth, width:windowWidth }}
                />
                </View>
            </View>
           
                
        </ScrollView>
    )
}

export default Blog

const styles = StyleSheet.create({})
