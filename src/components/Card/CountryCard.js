import React from 'react'
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 72

const CountryCard = ({ countryName, dateTrip, countryImage }) => {
    return (
        <ImageBackground
            style={styles.cardContainer}
            imageStyle={styles.cardImage}
            source={{ uri: countryImage }} >
            <View style={
                {
                    width: containerWidth,
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    position: 'absolute',
                    borderRadius: 30,
                }}>
                <Text style={styles.dateTrip}>{dateTrip}</Text>
                <Text style={styles.countryName}>{countryName}</Text>
            </View>
        </ImageBackground>
    )
}

export default CountryCard

const styles = StyleSheet.create({
    cardContainer: {
        width: containerWidth,
        height: 180,
        borderRadius: 30,
    },
    cardImage: {
        borderRadius: 30,
        position: 'relative'
    },
    countryName: {
        marginTop: 60,
        marginLeft: 20,
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    dateTrip: {
        top: 0,
        marginTop: 30,
        marginLeft: 20,
        color: 'white',
    }
})
