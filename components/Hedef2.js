import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity,StyleSheet,Modal,Animated,ProgressBarAndroid} from "react-native";
import Firebase from "../config/Firebase";
import { AntDesign } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as Progress from 'react-native-progress';

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;


const Hedef2 = ({ list }) => {

    const [KalanGun, setKalanGun] = useState(0);
    const [gun, setGun] = useState(0);
    
    let yuzdelik;

  /*  useEffect(()=>{

    Firebase.firestore()
        .collection("Users")
        .doc("Hedefler")
        .collection("Hedefler")
        .doc(list.name)
      .onSnapshot(function(doc) {
        var cities = [];
        var gun = [];
          cities.push(doc.data().KalanGun)
          
          gun.push(doc.data().gun)
          
      setKalanGun(cities)
      setGun(gun)
      });

       yuzdelik =(KalanGun/gun)
      console.log(yuzdelik)
 
    },[list.name])*/

const leftSwipe=(progress,dragX)=>{
  const scale=dragX.interpolate({
    inputRange:[0,100],
    outputRange:[0,1]
  })
  return( 
  <TouchableOpacity onPress={()=>sil()} activeOpacity={0.6} style={styles.silbox}>
    <View >
       <Animated.Text style={{transform:[{scale,scale}]}}>SİL</Animated.Text>
    </View>
  </TouchableOpacity>

  );
}

const sil=()=>{
  Firebase.firestore()
      .collection("Users")
      .doc("Hedefler")
      .collection("Hedefler")
      .doc(list.name)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });


}

  return (
    <Swipeable
    renderLeftActions={leftSwipe}
    >
 
    <View style={{ flex: 1, flexDirection: 'row',  backgroundColor:"pink"}}>  


    <View  style={{ flex: 2, flexDirection: 'row',alignItems:"center" }}>
     <AntDesign name={list.icon} size={35} color={list.color}  />
     </View>
     <View  style={{ flex:10 }}>
     <Text style={styles.listTitle} numberOfLines={1}>
       {list.name}
     </Text>
     </View>
     <View style={{height:"50%",alignItems:"center",paddingTop:"3%"}}>
         <Text>%{(list.KalanGun*100/list.gun).toFixed(2)} Complate</Text>
     <Progress.Bar progress={(list.KalanGun/list.gun)} width={100} height={"100%"} color={list.color} thickness={5}/>
     </View>
 </View>

 </Swipeable>
  );

};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 15,
    borderRadius: 2,
    width: "100%",
    height:60,
    backgroundColor:"pink",
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#634d4d",
    marginBottom: 18,
    paddingLeft:20,
    alignItems:"center",
    
    marginTop:10
  },
  silbox:{
    backgroundColor:'red',
    justifyContent:"center",
    width:"25%",
    alignItems:"center",

  }
});

export default Hedef2;