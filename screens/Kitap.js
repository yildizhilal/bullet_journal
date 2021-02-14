import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native'
 
import {Shadow} from 'react-native-shadow'

 
const Kitap=()=> {

  
const shadowOpt = {
  width:100,
  height:100,
  color:"#000",
  border:2,
  radius:3,
  opacity:0.2,
  x:0,
  y:3,
  style:{marginVertical:5}
}



        return (
          <Shadow setting={shadowOpt}>
      
          <View style={{width:100,height:100}}/>
      </Shadow>
        )
    }

    export default  Kitap;