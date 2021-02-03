import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity,StyleSheet,Modal,FlatList} from "react-native";
import Firebase from "../config/Firebase";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Aliskanliklar from "../screens/Aliskanliklar";
import moment from 'moment';
import { Calendar } from "react-native-calendars";

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const Zincir = ({ list }) => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [tarih,setTarih]=useState([]);


    let newDaysObject = {};

    tarih.forEach(function(day){
      newDaysObject[day] = {
          selected: true,
          marked: true,
          selectedColor:"purple"
      };
    });


    useEffect(()=>{


    const subscriber=Firebase.firestore()
      .collection("Users")
      .doc("Aliskanliklar")
      .collection("Aliskanliklar")
      .doc(list.name)
      .collection("Takip").where("check", "==", true)
    .onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(function(doc) {
            cities.push(doc.id);
        });
        setTarih(cities)
    });


    return () =>{subscriber(); } 
    },[modalVisible])



  return (
 
    <View style={{ flex: 1, flexDirection: 'row',  backgroundColor:"pink"}}>  


        <Modal
                animationType="slide"
                fullScreen={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <AntDesign name="close" size={24} color="black" onPress={() => {
          setModalVisible(false);
        }} />
               <Calendar

                markedDates={newDaysObject}
                />
               
        </View>
      </Modal>


    <View  style={{ flex: 2, flexDirection: 'row',alignItems:"center" }}>
     <AntDesign name={list.icon} size={35} color={list.color}  />
     </View>
     <View  style={{ flex:10 }}>
     <Text style={styles.listTitle} numberOfLines={1}>
       {list.name}
     </Text>
     </View>
     <TouchableOpacity   onPress={() => {setModalVisible(true);}} style={{ flex: 3,alignItems:"center"}}>
       <AntDesign name="calendar" size={24} color="black" />
     </TouchableOpacity>

 </View>
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
});

export default Zincir;