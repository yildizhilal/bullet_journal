import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Modal
  
} from "react-native";
import Firebase from "../config/Firebase";
import { AntDesign } from "../node_modules/@expo/vector-icons";


import moment from "moment";
console.disableYellowBox = true;

const AddTodo = (data) => {

    var ay =moment().format('MMMM'); 
    
  const [isim, setisim] = useState("");
  
  createFlowersList = () => {

    Firebase.firestore().collection("Users").doc(ay.toString()).collection(data.props).doc("Todo").collection("Todo").doc(isim).set({
        name: isim,
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

   
   

    closeModal();
  };


  return (


    
    <KeyboardAvoidingView style={styles.container} behavior="padding">


      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={closeModal}
      >
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizonal: 32 }}>
        <Text style={styles.title}>Yapılacak Ekle</Text>

<View style={{flexDirection:"row", justifyContent:"space-around"}}>
        <TextInput
          style={styles.input}
          placeholder="Besin Adı"
          onChangeText={(isim) => setisim(isim)}
        />
      
</View>
<TouchableOpacity
          style={{
            backgroundColor:"#adcceb",
            marginTop: 24,
            height: 50,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "space-around",
            alignSelf: "center",
            width: 310,
          }}
          onPress={()=>toggleAddBarkod()}
        >
         
        </TouchableOpacity>



        <TouchableOpacity
          style={{
            backgroundColor:"#adcceb",
            marginTop: 24,
            height: 50,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: 310,
          }}
          onPress={()=>createFlowersList()}
        >
          <Text style={{  color: "black", fontWeight: "700", fontSize: 25 }} >
            Ekle
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#f1e1c7",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  pickText: {
    paddingTop: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "black",
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#adcceb",
    borderWidth:2,
    backgroundColor:"white",
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 20,
    fontSize: 18,
    alignSelf: "center",
    width: "45%",
  },
});

export default AddTodo;
