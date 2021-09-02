import axios from 'axios';


const baseURL = 'https://startyourownstory.com/api' 
export default {
  getAllTripsByUser: function(userInfo) {
    return axios.post(`${baseURL}/getInfo`,userInfo);
  },
  getAllTripsByDestination: function(destination) {
    return axios.get(`${baseURL}/api/trips`, {
      params: {
        destination: destination
      }
    });
  },

  getNews: function() {
    return axios.get(`${baseURL}/getNews`);
  },
  getYelpBusinesses: function (location) {
    return axios.get(`${baseURL}/api/yelp/businesses/${location}`);
  },
  saveTrip: function(tripData) {
    return axios.post(`${baseURL}/setInfo`, tripData);
  },
  updateTrip: function(tripId, tripData) {
    return axios.put(`${baseURL}/api/trips/${tripId}`, tripData)
  },
  deleteTrip: function(tripId) {
    return axios.delete(`${baseURL}/api/trips/${tripId}`)
  },
  Register: function(userData){
    return axios.post(`${baseURL}/api/users/register`, userData);   
  },
  Login: function(userInfo){
    return axios.post(`${baseURL}/login`, userInfo);
  },
  IsLoggedIn:function(){
    return axios.get( `${baseURL}/api/users/home`)
  },
  Logout: function(){
    return axios.post(`${baseURL}/api/users/logout`);
  },
  getVehicles:function(){
      console.log(baseURL+'/api/getVehicle')
    return axios.get(`${baseURL}/getVehicle`)
  },
  getRooms:function(){
      console.log(baseURL+'/api/getRoom')
    return axios.get(`${baseURL}/getRoom`)
  },
  getFuel:function(){
      console.log(baseURL+'/api/getFeul')
    return axios.get(`${baseURL}/getFeul`)
  }
}

