import React, { useState, useEffect } from 'react'
import PTRView from 'react-native-pull-to-refresh';
import {
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    TitleText,
    RoundedButton,
    CountryCard,
    PlanCardItem,
    TabbarMenu,
} from '../../components';
import { defaultPadding } from '../../utils/theme';
import API from '../../API/Api'

const listCountries = [
    {
        name: "Hunza",
        image: "https://cdn.pixabay.com/photo/2018/08/16/08/39/hallstatt-3609863_960_720.jpg",
        // dateTrip: "Jul 5 - Jul 21"
    },
    {
        name: "Skardu",
        image: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        // dateTrip: "Jul 5 - Jul 21"
    },
    {
        name: "Naran",
        image: "https://images.pexels.com/photos/2412711/pexels-photo-2412711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        // dateTrip: "Jul 5 - Jul 21"
    },
]
// const planListItems = [
//     {
//         dateTrip: "Lahore - Hunza",
//         cityName: "Hunza",
//         cityImage: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//         placeName: "Hotel 1",
//         placeAddress: "Test Address",
//     },
//     {
//         dateTrip: "Islamabad - Hunza",
//         cityName: "Sakardu",
//         cityImage: "https://cdn.pixabay.com/photo/2020/03/08/17/09/belvedere-4913058_960_720.jpg",
//         placeName: "Hotel2",
//         placeAddress: "HotelABC",
//     }
    
// ]
const menuTab = [
    'Active',
    'Upcoming',
    'Past'
]
const Home = ({  navigation }) => {
    // SAVE INDEX INDEX MENU TAB
    const [indexTab, setIndexTab] = useState(0);
    const [planListItems, setplanListItems] = useState([]);
    useEffect(()=>{
        getAllTrips();
        
        getAllvehicles();
    },[])
    
    const getAllTrips = async()=>{
        console.log(userId)
        const userId = '612271fb6816ce08045e3852'
        API.getAllTripsByUser(userId)
          .then(res => {
            console.log(res.data.trips);
             setplanListItems( res.data.trips );
          })
          .catch(err => console.log('Catched',err))
    }
    const getAllvehicles = async()=>{
        const userId = '1';
        API.getVehicles()
          .then(res => {
            console.log(res.data);
            // this.setState({ allTrips: res.data });
          })
          .catch(err => console.log('Catched',err))
    }
    return (
        <PTRView onRefresh={getAllTrips} >

        
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
            }}>
            {/* TITLE AND SEARCH BUTTON */}
            <View style={{
                paddingHorizontal: defaultPadding,
                marginTop: 48,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }} >
                <TitleText text="My Trips" />
                {/* <RoundedButton icon="search" /> */}
            </View>

            {/* TAB BUTTON */}
            {/* <ScrollView horizontal={true}
                style={{
                    marginTop: defaultPadding,
                    paddingHorizontal: defaultPadding,
                    height: 40,
                }}>
                {
                    menuTab.map((menu, index ) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => setIndexTab(index)}>
                                <TabbarMenu textMenu={menu} isSelectedMenu={index === indexTab} />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView> */}

            {/* COUNTRY CARD */}
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    marginTop: 48 / 2,
                    height: 200
                }}>
                {
                    listCountries.map((country, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    marginStart: (index === 0) ? defaultPadding : 0,
                                    marginEnd: defaultPadding
                                }}>
                                <CountryCard countryName={country.name} dateTrip={country.dateTrip} countryImage={country.image} />
                            </View>
                        )
                    })
                }
            </ScrollView>

            {/* PLAN LIST */}
            <View style={{
                margin: defaultPadding,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }} >
                <TitleText text="Plans" />
                {/* <RoundedButton icon="payment" /> */}
            </View>

            <View style={{
                marginHorizontal: defaultPadding,
            }}>
                {
                    planListItems ?(
                    planListItems.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Plan', { ...item })}
                                key={index}>
                                <PlanCardItem
                                    planData={item} />
                            </TouchableOpacity>
                        )
                    })):(<View>

                    </View>)
                }
            </View>

            {/* BOTTOM NAVBAR */}
            {/* <BottomNavigationBar /> */}


        </ScrollView>
        </PTRView>
    )
}

export default Home
