import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity,StyleSheet,FlatList} from "react-native";
import Firebase from "../config/Firebase";
import { AntDesign } from "../node_modules/@expo/vector-icons";
import { Feather } from "../node_modules/@expo/vector-icons";
import Aliskanliklar from "../screens/Aliskanliklar";
import moment from 'moment';


//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const AliskanliklarList = ({ list }) => {
    const [checkbutton, setCheck] = useState(false);
    var tarih =moment().format('LL'); 
    const [tt, setTarih] = useState([]);


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


    console.log("xxx",tt)



    return () =>{subscriber(); subscriberTarih();} 
    },[tarih])

    check=()=>{
        if (checkbutton) {
            setCheck(false);
            var waterRef = Firebase.firestore()
              .collection("Users")
              .doc("Aliskanliklar")
              .collection("Aliskanliklar")
              .doc(list.name)
              .collection("Takip")
              .doc(tarih)
            return waterRef
              .update({
                check: false,
              })
              .then(function () {
                console.log("D!");
              })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          } else {
            setCheck(true);
            var waterRef = Firebase.firestore()
              .collection("Users")
              .doc("Aliskanliklar")
              .collection("Aliskanliklar")
              .doc(list.name)
              .collection("Takip")
              .doc(tarih)
      
            return waterRef
              .update({
                check: true,
              })
              .then(function () {
                console.log("Doc");
              })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          }
        };

  return (
 
      <View style={{ flex: 1, flexDirection: 'row',  backgroundColor:"pink"}}>   
         <View  style={{ flex: 2, flexDirection: 'row',alignItems:"center" }}>
          <AntDesign name={list.icon} size={35} color={list.color}  />
          </View>
          <View  style={{ flex:10 }}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
          </View>

         
          <TouchableOpacity onPress={check} style={{ flex: 3,alignItems:"center"}}>
            <Feather
              name={checkbutton ? "check-square" : "square" }
              size={25}
              color="white"
              style={{ width: 32, paddingLeft: 10 ,}}
            />
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

export default AliskanliklarList;