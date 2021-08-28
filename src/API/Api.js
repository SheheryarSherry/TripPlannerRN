import axios from 'axios';


const baseURL = 'https://startyourownstory.com/api' 
export default {
  getAllTripsByUser: function(userId) {
    return axios.get(`${baseURL}/api/users/${userId}`);
  },
  getAllTripsByDestination: function(destination) {
    return axios.get(`${baseURL}/api/trips`, {
      params: {
        destination: destination
      }
    });
  },

  getTrip: function(tripId) {
    return axios.get(`${baseURL}/api/trips/${tripId}`);
  },
  getYelpBusinesses: function (location) {
    return axios.get(`${baseURL}/api/yelp/businesses/${location}`);
  },
  saveTrip: function(tripData) {
    return axios.post(`${baseURL}/setInfo(post)`, tripData);
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
    return axios.post(`${baseURL}/api/users/login`, userInfo);
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

