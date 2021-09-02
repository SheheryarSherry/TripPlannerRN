import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, View, TouchableOpacity,
    Text
} from 'react-native';
import { Input, Icon, ListItem, Image } from 'react-native-elements';
import API from '../../API/Api'
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import RadioButtonRN from 'radio-buttons-react-native';
import MaskInput from 'react-native-mask-input';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import AsyncStorage from '@react-native-community/async-storage';
// import DialogInput from 'react-native-dialog-input-custom';
import Dialog from "react-native-dialog";

const { width, height } = Dimensions.get('window');



class CreatePlan extends Component {

    constructor(props) {
        super(props);

        // AirBnB's Office, and Apple Park
        this.state = {

            allVehicles: [],
            NoOfNights: 0,
            NoOfRooms: 0,
            tripName: '',
            roomRent: 0,
            fuelRate: 0,
            emailValidation: '',
            vehicleValidation:'',
            roomValidation:'',
            nightValidation:'',
            origin: this.props.route.params.origin,
            destination: this.props.route.params.destination,
            distance: this.props.route.params.Km,
            budget: 0,
            milage: 0,
            VehicleType: '',
            username: '',
            email: '',
            isdisabled: false,
            phone: '',
            userId: '',
            sRoomMin: 0,
            sRoomMax: 0,
            lRoomMin: 0,
            lRoomMax: 0,
            dRoomMin: 0,
            budget_1: '',
            budget_2: '',
            budget_3: '',
            password: '',
            isModalVisible: false,
            dRoomMax: 0,
            errorMessage: '',
            tableHead: ['', 'Vehicle', 'Rooms', 'Nigths', 'Budget'],
            tableTitle: ['Standard', 'Luxury', 'Deluxe'],
            tableData: [
            ],
            IsLoggedIn: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handelRegister = this.handelRegister.bind(this);
    }
    componentDidMount() {
        this.isLoggedInUser()
        this.setEmail()
        this.setName()
        this.getAllvehicles()
        this.getFuel()
        this.getRoom()
    }
    isLoggedInUser() {
        AsyncStorage.getItem('userToken').then((value) => {
            console.log(value === null ? ":: NO USER FOUND ::" : "USER FOUND")
            if (value === null) {
                this.setState({ 'IsLoggedIn': false })
                this.setState({ 'isdisabled': false })
            } else {
                this.setState({ 'IsLoggedIn': true })
                this.setState({ 'isdisabled': true })
            }
        })
    }
    setEmail() {
        AsyncStorage.getItem('userEmail').then((value) => {
            console.log(value === null ? ":: NO USER FOUND ::" : "USER FOUND")
            if (value === null) {
            } else {
                this.setState({ 'email': value })
            }
        })
    }
    setName() {
        AsyncStorage.getItem('userName').then((value) => {
            console.log(value === null ? ":: NO USER FOUND ::" : "USER FOUND")
            if (value === null) {
            } else {
                this.setState({ 'username': value })
            }
        })
    }
    handleChange(event) {
        this.setState({ NoOfNights: event.target.value });
        console.log(event.target.value)
    }
    handelRegister() {
        API.Register({
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            password: '12345'

        }).then(res => {
            console.log("UserSaved");
            console.log(res.data)
            this.setState({ 'userId': res.data._id })
        }).catch(err => console.log(err))
    }
    handleRoomChange(event) {

        this.setState({ NoOfRooms: event.target.value });
        console.log(event.target.value)
    }
    handleusername(event) {

        this.setState({ username: event.target.value });
        console.log(event.target.value)
    }
    getAllvehicles() {
        API.getVehicles()
            .then(res => {

                console.log('test');
                console.log(res.data);
                let tempArray = []
                res.data.forEach(element => {
                    tempArray.push({ 'label': element.name, 'milage': element.milage })
                    console.log(element.name, 'milage:::::', element.milage)
                });
                console.log(tempArray)
                this.setState({ allVehicles: tempArray });

            })
            .catch(err => console.log('Catched', err))
    }
    getFuel() {
        API.getFuel().then(res => {
            console.log(res.data);
            this.setState({ 'fuelRate': res.data.price })
        }).catch(err => console.log(err))
    }
    getRoom() {
        API.getRooms().then(res => {
            console.log(res.data)
            this.setState({ 'roomRent': res.data })
            this.setState({ 'sRoomMin': res.data[0].min_price })
            this.setState({ 'sRoomMax': res.data[0].max_price })
            this.setState({ 'lRoomMin': res.data[1].min_price })
            this.setState({ 'lRoomMax': res.data[1].max_price })
            this.setState({ 'dRoomMin': res.data[2].min_price })
            this.setState({ 'dRoomMax': res.data[2].max_price })
        })
    }
    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ 'emailValidation': 'Please enter a valid email.' })
            this.setState({ 'email': text })
            return false;
        }
        else {
            this.setState({ 'email': text })
            console.log("Email is Correct");
            this.setState({ 'emailValidation': '' })
        }
    }
    handleProceed =() => {
        API.saveTrip({
            from: this.state.origin,
            to: this.state.destination,
            distance: this.state.distance,
            vehicle: this.state.VehicleType,
            feul: this.state.fuelRate,
            stay: this.state.NoOfNights,
            room: this.state.NoOfRooms,
            name: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            budget_1: this.state.budget_1,
            budget_2: this.state.budget_2,
            budget_3: this.state.budget_3,
            password: this.state.password
        })
            .then(res => {
                console.log(res.data)
                this.props.navigation.navigate('Home')
                // Tells react router to change url
                // this.props.history.push(`/trip-plans/${savedTripIds[savedTripIds.length - 1]}`);
            })
            .catch(err => console.log(err));
    }
    handleSubmit = event => {
        this.setState({ 'isModalVisible': true })
        if (this.state.VehicleType == '' ||
            this.state.NoOfNights == 0 ||
            this.state.NoOfRooms == 0 ||
            this.state.username == '' ||
            this.state.email == '' ||
            this.state.emailValidation != '' ||
            this.state.phone == '') {
            this.setState({ 'errorMessage': 'Please fill the reuired fields' })
        } else {
            this.setState({ 'errorMessage': '' })
        }


        // event.preventDefault();
        // if(!this.state.origin || !this.state.destination){
        //   alert("Please enter valid origin or destination.")
        // }



    }

    render() {

        const { destination, origin, Km } = this.props.route.params;
        const { NoOfNights,
            NoOfRooms,
            isModalVisible,
            milage,
            username,
            fuelRate,
            roomRent,
            sRoomMin,
            sRoomMax,
            lRoomMax,
            lRoomMin,
            dRoomMin,
            dRoomMax,
            password } = this.state;

        let sliceOrigin = origin.split(',', 1)
        let sliceDestination = destination.split(',', 1)

        const distance = Km
        const rooms = NoOfRooms
        const nights = NoOfNights
        const consumePerliter = (distance / milage) * fuelRate;
        console.log(sRoomMin, sRoomMax, lRoomMin, lRoomMax, dRoomMin, dRoomMax, nights, rooms, milage, distance, fuelRate, consumePerliter, password)
        const SRatesMin = consumePerliter + ((sRoomMin * nights) * rooms)
        const LRatesMin = consumePerliter + ((lRoomMin * nights) * rooms)
        const DRatesMin = consumePerliter + ((dRoomMin * nights) * rooms)
        const SRatesMax = consumePerliter + ((sRoomMax * nights) * rooms)
        const LRatesMax = consumePerliter + ((lRoomMax * nights) * rooms)
        const DRatesMax = consumePerliter + ((dRoomMax * nights) * rooms)

        const tblData = [
            [this.state.VehicleType, NoOfRooms, NoOfNights, 'PKR ( ' + SRatesMin.toFixed(0) + ' - ' + SRatesMax.toFixed(0) + ' )'],
            [this.state.VehicleType, NoOfRooms, NoOfNights, 'PKR ( ' + LRatesMin.toFixed(0) + ' - ' + LRatesMax.toFixed(0) + ' )'],
            [this.state.VehicleType, NoOfRooms, NoOfNights, 'PKR ( ' + DRatesMin.toFixed(0) + ' - ' + DRatesMax.toFixed(0) + ' )'],

        ]
        const budgetData = [
            {
                label: 'Standard: PKR' + SRatesMin.toFixed(0) + '-' + SRatesMax.toFixed(0) + '/-'
            },
            {
                label: 'Luxury: PKR' + LRatesMin.toFixed(0) + '-' + LRatesMax.toFixed(0) + '/-'
            },
            {
                label: 'Deluxe: PKR' + DRatesMin.toFixed(0) + '-' + DRatesMax.toFixed(0) + '/-'
            }
        ]
        const progressStepsStyle = {
            labelFontSize: 11,
            borderWidth: 0,
            marginBottom: 40,
            topOffset: 10,
            margin: 30,
            activeStepIconBorderColor: '#fb5b5a',
            activeLabelColor: '#fb5b5a',
            activeStepNumColor: '#fb5b5a',
            activeStepIconColor: '#fb5b5a',
            completedStepIconColor: '#fb5b5a',
            completedProgressBarColor: '#fb5b5a',
            completedCheckColor: 'white'
        };

        return (
            <>


                <View style={{
                    height: '100%',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                }} >

                    <ScrollView>
                        <View style={{
                            height: height / 9,

                            backgroundColor: '#fafafa',
                            flexDirection: 'row',
                            shadowColor: "black",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.9,
                            shadowRadius: 0.80,
                            elevation: 10,
                            paddingTop: 10,
                            paddingBottom: 5,
                            paddingHorizontal: 10,
                            borderBottomStartRadius: 30,
                            borderBottomEndRadius: 30,
                        }}  >
                            <View style={{
                                flexDirection: 'column',
                                height: '100%',
                                width: '35%',
                                alignItems: 'center',
                            }} >
                                <Text onPress={() => {
                                    this.props.navigation.navigate('Trip')
                                }} style={{ color: '#182166', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>{origin ? sliceOrigin : '--'}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                height: '100%',
                                alignItems: 'center',
                                width: '30%',
                            }} >

                                <Icon
                                    name='location'
                                    type='evilicon'
                                    solid={true}
                                    size={30}
                                    color='#517fa4'


                                />
                                <Text style={{ color: 'grey', fontSize: 15, margin: 0, textAlign: 'center' }}>{Km} KM</Text>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                width: '30%',
                                marginRight: 30,
                                alignItems: 'flex-end'
                            }} >
                                <Text onPress={() => {
                                    this.props.navigation.navigate('Trip')
                                }} style={{ color: '#182166', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>{destination ? sliceDestination : '--'}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 30, padding: 30 }}>
                            <ProgressSteps {...progressStepsStyle} >
                                <ProgressStep nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="Vehicle" nextBtnDisabled={this.state.VehicleType==''?true : false}>
                                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Trebuchet MS' }}>How Would you like to travel by road?*</Text>
                                        <RadioButtonRN
                                            data={this.state.allVehicles}
                                            textStyle={{ fontSize: 17, textAlign: 'center' }}
                                            style={{ width: '100%', marginTop: 30 }}
                                            selectedBtn={(e) => {
                                                if(e==null){
                                                    this.setState({'vehicleValidation':'Please select vehicle type'})
                                                }
                                                console.log("Value set to milage and vehicle", e);
                                                this.setState({ 'VehicleType': e.label })
                                                
                                                this.setState({'vehicleValidation':''})
                                                this.setState({ 'milage': e.milage })
                                            }
                                            }

                                        />
                                         <Text style={{ fontSize: 10, color: 'red', fontFamily: 'Trebuchet MS' }}>{this.state.vehicleValidation}</Text>
                                    </View>
                                </ProgressStep>
                                <ProgressStep nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} nextBtnDisabled={this.state.NoOfNights==0||isNaN(this.state.NoOfNights)?true : false} previousBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="Stay">
                                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Trebuchet MS' }}>How many nights would you like on your trip? *</Text>
                                        <Input keyboardType='number-pad' type="text" style={{ marginTop: 30 }} value={this.state.NoOfNights} onChangeText={(value) => {
                                            this.setState({ 'NoOfNights': value })
                                            if(isNaN(value)){
                                                this.setState({'nightValidation':'Please enter a valid number'})
                                            }else{
                                                this.setState({'nightValidation':''})
                                            }
                                        }}
                                            placeholder='Type your answer here...'
                                        />
                                    </View>
                                        <Text style={{ fontSize: 10, color: 'red', fontFamily: 'Trebuchet MS' }}>{this.state.nightValidation}</Text>
                                       
                                </ProgressStep>
                                <ProgressStep nextBtnDisabled={this.state.NoOfRooms==0||isNaN(this.state.NoOfRooms)?true : false} nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} previousBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="Rooms"  >
                                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Trebuchet MS' }}>How many rooms would you like to book? *</Text>
                                    </View>
                                    <Input type="number" keyboardType='number-pad' style={{ marginTop: 30 }} value={this.state.NoOfRooms} onChangeText={(value) => {
                                        this.setState({ 'NoOfRooms': value })
                                        if(isNaN(value)){
                                            this.setState({'roomValidation':'Please enter a valid number'})
                                        }else{
                                            this.setState({'roomValidation':''})
                                        }
                                    }}
                                        placeholder='Type your answer here...'
                                    />
                                     <Text style={{ fontSize: 10, color: 'red', fontFamily: 'Trebuchet MS' }}>{this.state.nightValidation}</Text>
                                </ProgressStep>


                                <ProgressStep nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} nextBtnDisabled={this.state.username==''?true : false} nextBtnText={this.isLoggedInUser ? 'Skip' : 'Next'} previousBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="Name"   >
                                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Trebuchet MS' }}> {this.isLoggedInUser ? 'Already have user name Skip this step' : "What's your name? *"}</Text>
                                    </View>
                                    <Input type="text" style={{ marginTop: 30 }} value={this.state.username} disabled={this.state.isdisabled} onChangeText={(value) => {
                                        console.log(value)
                                        this.setState({ 'username': value })
                                    }}
                                        placeholder='Type your answer here...'
                                    />
                                </ProgressStep>
                                <ProgressStep nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} nextBtnDisabled={this.state.emailValidation!=''?true : false} nextBtnText={this.isLoggedInUser ? 'Skip' : 'Next'} previousBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="Email"  >
                                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Trebuchet MS' }}>{this.isLoggedInUser ? 'Email set already Skip this step' : 'Whats your email Address'}</Text>
                                    </View>
                                    <Input type="text" style={{ marginTop: 30 }} disabled={this.state.isdisabled} value={this.state.email} onChangeText={(value) => {
                                        this.validate(value)
                                    }}
                                        placeholder='ex: email@example.com...'
                                    />
                                    <Text style={{ fontSize: 10, color: 'red', fontFamily: 'Trebuchet MS' }}>{this.state.emailValidation}</Text>
                                </ProgressStep>

                                <ProgressStep onNext={this.handelRegister} nextBtnDisabled={this.state.phone==''?true : false} nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} previousBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="Phone"  >
                                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Trebuchet MS' }}>What's your phone number*</Text>
                                    </View>
                                    {/* <Input type="text" style={{ marginTop:30}} value={this.state.phone} onChangeText={(value) => {
                                                    this.setState({'phone':value})
                                                }}
                                        placeholder='ex: 03XXXXXXXXX'
                                    /> */}
                                    <MaskInput keyboardType='number-pad' value={this.state.phone} style={{ marginTop: 30, alignSelf: 'center', fontSize: 25 }} onChangeText={(value) => {
                                        this.setState({ 'phone': value })
                                        this.setState({ 'budget_1': SRatesMin + '-' + SRatesMax })
                                        this.setState({ 'budget_2': LRatesMin + '-' + LRatesMax })
                                        this.setState({ 'budget_3': DRatesMin + '-' + DRatesMax })
                                    }} mask={[
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        '-',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                    ]}>

                                    </MaskInput>
                                </ProgressStep>
                                <ProgressStep nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} nextBtnDisabled={this.state.password==''&&!this.isLoggedInUser?true : false} nextBtnText={this.isLoggedInUser ? 'Skip' : 'Next'} previousBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="password"  >
                                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'Trebuchet MS' }}> {this.isLoggedInUser ? 'You are already logged in skip this step' : 'Create Password *'}</Text>
                                    </View>
                                    <Input type="text" secureTextEntry={true} style={{ marginTop: 30 }} disabled={this.state.isdisabled} value={this.state.password} onChangeText={(value) => {
                                        this.setState({ 'password': value })
                                        console.log(value)
                                    }}
                                        placeholder='Type your password here...'
                                    />
                                </ProgressStep>
                                <ProgressStep nextBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} previousBtnTextStyle={{ fontSize: 20, color: '#fb5b5a' }} label="Calculate" onSubmit={this.handleSubmit} >

                                    <Dialog.Container visible={isModalVisible}>
                                        <Dialog.Title>Save Trip Info</Dialog.Title>
                                        <Dialog.Description>
                                            Do you want to Save this Trip? You cannot undo this action.
                                        </Dialog.Description>
                                        <Dialog.Button label="Cancel" onPress={() => { this.setState({ 'isModalVisible': false })}} />
                                        <Dialog.Button label="Save" onPress={this.handleProceed} />
                                    </Dialog.Container>
                                    <View >
                                        <Table borderStyle={{ borderWidth: 1 }}>
                                            <Row data={this.state.tableHead} flexArr={[1, 0.8, 0.5, 0.5, 2]} style={styles.head} textStyle={styles.text} />
                                            <TableWrapper style={styles.wrapper}>
                                                <Col data={this.state.tableTitle} style={styles.title} heightArr={[40, 40]} textStyle={styles.text} />
                                                <Rows data={tblData} flexArr={[0.8, 0.5, 0.5, 2]} style={styles.row} textStyle={styles.text} />
                                            </TableWrapper>
                                        </Table>
                                    </View>
                                    {/* </View> */}
                                </ProgressStep>
                            </ProgressSteps>
                        </View>
                    </ScrollView>
                </View>
                <View>

                </View>
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
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa', width: 300 },
    row: { height: 40 },
    text: { textAlign: 'center', fontSize: 10 }
});

export default CreatePlan;