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
    const [checkbutton, setCheck] = useState(false);
    
    
    const [modalVisible, setModalVisible] = useState(false);
    var tarih =moment().format('LL'); 
    const [tt, setTarih] = useState([]);
    const [son, setSon] = useState([]);

    useEffect(()=>{
    

      var cityRef =Firebase.firestore()
      .collection("Users")
      .doc("Aliskanliklar")
      .collection("Aliskanliklar")
      .doc(list.name)
      .collection("Takip")
      .doc(tarih)

      var setWithMerge = cityRef.set({
          check: false
      }, { merge: true });


      const subscriber=Firebase.firestore()
      .collection("Users")
      .doc("Aliskanliklar")
      .collection("Aliskanliklar")
      .doc(list.name)
      .collection("Takip")
      .doc(tarih)
    .onSnapshot(function(doc) {
        setCheck(doc.data().check)
    });


    const subscriberTarih = Firebase.firestore()
    .collection("Users")
    .doc("Aliskanliklar")
    .collection("Aliskanliklar")
    .doc(list.name)
    .collection("Takip")
  
    .onSnapshot((querySnapshot) => {
      const tt = [];

      querySnapshot.forEach((documentSnapshot) => {
        tt.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });



      setTarih(tt);
    });

  

    return () =>{subscriber(); subscriberTarih();} 
    },[tarih])



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
        <Text>{son}</Text>
               <Calendar
                markedDates={{
                "2021-01-25": {selected: true, marked: true, selectedColor: 'blue'},
                }}
                markingType={'multi-dot'}
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