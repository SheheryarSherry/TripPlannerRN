import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, View,
    Text,
    TextInput,
    Button,
    TouchableHighlight,
    InteractionManager,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { RoundedButton, TitleText, SubtitleText, Avatar, EntertainmentCard, PrimaryButton } from '../../components';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { PERMISSIONS, request } from 'react-native-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import geolocation from '@react-native-community/geolocation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 13.076349;
const LONGITUDE = 80.199552;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCsdnie49syF6ZMPK2pzjpRbnTwdPcaKrU';

const GooglePlacesInput = (placeholder) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data);
                console.log(JSON.stringify(details.geometry.location))
            }}
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
            }}
        />

    );
};
class Trip extends Component {

    constructor(props) {
        super(props);

        // AirBnB's Office, and Apple Park
        this.state = {
            coordinates: this.props.coordinates,
            initialCoords: undefined,
            to: '',
            from: '',
            isLoading: false,
            km: 0,
            mapOrigin: '',
            mapDestination: '',
            vehicleData: [
                {
                    label: 'Sedan',
                },
                {
                    label: 'SUV'
                },
                {
                    label: 'Other'
                }
            ],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
          }
        };

        this.mapView = null;
    }
    
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            let requestLoicationPermission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
            if (Platform.OS == 'ios') {
                requestLoicationPermission = PERMISSIONS.IOS.LOCATION_ALWAYS;
            }


        })
        this.getCurrentLocation()
    }
     getCurrentLocation() {
        geolocation.getCurrentPosition(
            position => {
            let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 5,
                    longitudeDelta: 5
                };
                 this.setState({
                    initialRegion: region
                });
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }
    onPressTo = (data, details = null) => {
        // 'details' is provided when fetchDetails = true
        this.setState();
        console.log(to);
    }

    //   static getDerivedStateFromProps(nextProp, state) {
    //     // if (
    //     //   JSON.stringify(nextProp.coordinates) !== JSON.stringify(state.coordinates)
    //     // ) {
    //     console.log(nextProp);
    //     return { coordinate: nextProp.coordinates, initialCoords: nextProp.coordinates[0] };
    //     // }
    //     // return null;
    //   }

    render() {
        const progressStepsStyle = {
            labelFontSize: 10,
            marginBottom: 40,
            topOffset: 10,
            activeStepIconBorderColor: '#7db0ff',
            activeLabelColor: '#7db0ff',
            activeStepNumColor: 'white',
            activeStepIconColor: '#7db0ff',
            completedStepIconColor: '#7db0ff',
            completedProgressBarColor: '#7db0ff',
            completedCheckColor: 'white'
        };
        var { to, from, mapOrigin, mapDestination, km, isLoading } = this.state

        return (
            <>
            {/* <ScrollView keyboardShouldPersistTaps='always' listViewDisplayed={false}>

            </ScrollView> */}
            <KeyboardAvoidingView style={{ flex: 1}}
            behavior='height' 
        >
            <ScrollView keyboardShouldPersistTaps='always' listViewDisplayed={false} style={{flex:1}}>
                
           
        

                    <View style={{
                        
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        // borderTopStartRadius: 30,
                        // borderTopEndRadius: 30,
                        padding:5
                    }} >

                        <View style={{
                            backgroundColor: 'white',
                            flexDirection: 'column',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.98,
                            shadowRadius: 16.00,
                            elevation: 24,
                            paddingTop: 10,
                            paddingBottom: 5,
                            paddingHorizontal: 10,
                            // borderTopStartRadius: 30,
                            // borderTopEndRadius: 30,
                            padding:30

                        }}>
                            <View style={{
                                flexDirection: 'column',
                                marginVertical: 0,

                                marginRight: 10,
                            }}>

                                <View>
                                    <Text
                                        style={{
                                            color: '#182166',
                                            marginLeft: 10,
                                            fontSize: 28,
                                            fontWeight: 'bold',
                                            fontFamily: 'Andale Mono, monospace'
                                        }}>
                                        Plan Your Trip</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'column', marginTop: 0 }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: 2,
                                            marginRight: 2,
                                            width: 12,
                                            height: 12,
                                            borderRadius: 12 / 2,
                                            backgroundColor: '#b0d1ff'
                                        }}>

                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: 2,
                                            marginRight: 20,
                                            height: 60,
                                            borderColor: 'black',
                                            borderWidth: 1,
                                            borderRightWidth: 0,
                                            marginStart: 0,
                                            marginEnd: 0,
                                            borderTopStartRadius: 50,
                                            borderBottomStartRadius: 50
                                        }}
                                        ></View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: 2,
                                            marginRight: 2,
                                            width: 12,
                                            height: 12,
                                            backgroundColor: 'black'
                                        }}>

                                        </View>
                                    </View>
                                    
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={styles.inputContainer}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: 0

                                            }}>

                                                <GooglePlacesAutocomplete

                                                    styles={{
                                                        textInput: {
                                                            borderRadius: 0,
                                                            color: '#5d5d5d',
                                                            fontSize: 16,
                                                            backgroundColor: '#fafafa'

                                                        },
                                                        predefinedPlacesDescription: {
                                                            color: '#1faadb',
                                                        },
                                                    }}
                                                    placeholder='From'
                                                    onPress={(data, details = null) => {
                                                        // 'details' is provided when fetchDetails = true
                                                        this.setState({ from: data.description })
                                                        console.log(from);
                                                    }}
                                                    query={{
                                                        key: GOOGLE_MAPS_APIKEY,
                                                        language: 'en',
                                                    }}
                                                />
                                            </View>
                                        </View>

                                        <View style={styles.inputContainer}>


                                            <GooglePlacesAutocomplete
                                                styles={{

                                                    focused:true,
                                                    textInput: {
                                                        borderRadius: 0,
                                                        color: '#5d5d5d',
                                                        fontSize: 16,
                                                        backgroundColor: '#fafafa'

                                                    },
                                                }}
                                                onChangeText={
                                                    (data) => {
                                                        this.setState({ mapOrigin: this.state.to })
                                                        this.setState({ mapDestination: data.description })
                                                    }
                                                }
                                                placeholder='Where to'
                                                
                                                onPress={(data, details = null) => {
                                                    // 'details' is provided when fetchDetails = true
                                                    this.setState({ to: data.description })
                                                    this.setState({ mapOrigin: this.state.from })
                                                    this.setState({ mapDestination: data.description })
                                                    console.log(to);
                                                }}
                                                query={{
                                                    key: GOOGLE_MAPS_APIKEY,
                                                    language: 'en',
                                                }}
                                            />
                                        </View>
                                        <View>

                                        <PrimaryButton onPress={() => this.props.navigation.navigate('CreatePlan',
                                            {
                                                origin: this.state.mapOrigin,
                                                destination: this.state.mapDestination,
                                                Km: this.state.km
                                            })} disabled={to==null?true:false}
                                            btnText={'Set up your trip to '+this.state.mapDestination.split(',',1)} isLoading={isLoading} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* <View style={{
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        height: height / 2.5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.98,
                        shadowRadius: 16.00,
                        elevation: 24,
                        marginTop: 5,
                        paddingTop: 10,
                        paddingBottom: 30,
                        paddingHorizontal: 0,
                        borderBottomStartRadius: 30,
                        borderBottomEndRadius: 30,

                    }}>
                        <ScrollView>


                            <View>
                                <Text
                                    style={{
                                        color: '#182166',
                                        marginLeft: 10,
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        fontFamily: 'Andale Mono, monospace'
                                    }}>
                                    Add Details</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ProgressSteps {...progressStepsStyle} >
                                    <ProgressStep label="first Step">
                                        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                            <Text style={{ fontSize: 18 }}>How Would you like to travel by road?</Text>

                                            <RadioButtonRN
                                                data={this.state.vehicleData}
                                                textStyle={{ fontSize: 17 }}
                                                style={{ width: '100%' }}
                                                selectedBtn={(e) => console.log(e)}

                                            />
                                        </View>
                                    </ProgressStep>
                                    <ProgressStep label="Second Step">
                                        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                            <Text style={{ fontSize: 18 }}>How many nights would you like on your trip? *</Text>
                                            <Input onChange={() => {
                                                this.setState({})
                                            }}
                                                placeholder='Type your answer here...'
                                            />
                                        </View>
                                    </ProgressStep>
                                    <ProgressStep label="Third Step">
                                        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                            <Text style={{ fontSize: 18 }}>How many rooms would you like to book? *</Text>
                                        </View>
                                        <Input
                                            placeholder='Type your answer here...'
                                        />
                                    </ProgressStep>
                                </ProgressSteps>
                            </View>
                        </ScrollView>
                    </View> */}
                    </View>
                    <MapView
                    showsUserLocation={true}
                    loadingEnabled
                    mapType='standard'
                    zoomEnabled={true}
                    style={{
                        height: height / 1.2 ,
                        // justifyContent: 'flex-end',
                        position: 'relative'
                    }}
                    ref={c => this.mapView = c}
                >

                    {/* {this.state.coordinates.map((coordinate, index) =>
              <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
            )} */}
                    {
                        <MapViewDirections
                            // origin={this.state.coordinates[0]}

                            origin={this.state.mapOrigin}
                            // waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
                            // destination={this.state.coordinates[this.state.coordinates.length - 1]}
                            // destination={{"latitude":31.5045459, "longitude":74.3313551}}
                            destination={this.state.mapDestination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={2}
                            strokeColor="black"
                            optimizeWaypoints={true}
                            onStart={(params) => {
                                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                this.setState({ isLoading: true })
                            }}
                            onReady={result => {
                                this.setState({ km: result.distance })
                                this.setState({ isLoading: false })
                                console.disableYellowBox = true;
                                console.log('Distance: ' + result.distance, 'km')
                                console.log('Duration: ${result.duration} min.')

                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 80),
                                        bottom: (height / 80),
                                        left: (width / 80),
                                        top: (height / 80),
                                    }
                                });
                            }}
                            onError={(errorMessage) => {
                                // console.log('GOT AN ERROR');
                            }}
                        />
                    }

                </MapView>
                </ScrollView>
                </KeyboardAvoidingView>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {

        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});

export default Trip;