import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity,StyleSheet} from "react-native";
import Firebase from "../config/Firebase";
import { AntDesign } from "../node_modules/@expo/vector-icons";
import { Feather } from "../node_modules/@expo/vector-icons";

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const Hedef = ({ list }) => {
    const [checkbutton, setCheck] = useState(false);
    
    const [KalanGun, setKalanGun] = useState(0);
    const [gun, setGun] = useState(0);

    useEffect(()=>{

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
    },[list.name])

    check=()=>{

        if (checkbutton) {
            setCheck(false);
            var waterRef = Firebase.firestore()
              .collection("Users")
              .doc("Hedefler")
              .collection("Hedefler")
              .doc(list.name)
            return waterRef
              .update({
                KalanGun: (KalanGun-1),
                complate:false
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
              .doc("Hedefler")
              .collection("Hedefler")
              .doc(list.name)
            return waterRef
              .update({
                KalanGun: (Number(KalanGun)+1),
              })
              .then(function () {
                if(Number(KalanGun)==(Number(gun)-1))
                {
                    console.log(gun)
                    var cityRef =Firebase.firestore()
                    .collection("Users")
                    .doc("Hedefler")
                    .collection("Hedefler")
                    .doc(list.name)
                    return cityRef
                      .update({
                        complate:true
                      })
                }
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

export default Hedef;