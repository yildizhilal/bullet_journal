import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList
  
} from "react-native";
import { Header} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import Firebase from '../config/Firebase'
import { AntDesign } from "../node_modules/@expo/vector-icons";
import {LocaleConfig} from 'react-native-calendars';
import Zincir from "../components/Zincir";





const Aliskanliklar = () => {

  LocaleConfig.locales['tr'] = {
    monthNames: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
    monthNamesShort: ['Oca','Şub', 'Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'],
    dayNames: ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi','PAzar'],
    dayNamesShort: ['Pzt.','Sal.','Çar.','Per.','Cum.','Cmt.','Pzr'],
  };
  LocaleConfig.defaultLocale = 'tr';

  var tarih =moment().format("YYYY-MM-DD")
    
  const [isim, setisim] = useState("bos");
  const [color, setcolor] = useState({});
  const [iconn, seticon] = useState({});
  


  var backgroundColor = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#2196F3",
    "#4CAF50",
    "#FF9800",
    "#26C6DA",
    "#81C784",
    "#FFC107",
  ];

  var icon = [
    "star",
    "heart",
    "exclamationcircle",
    "mail",
    "shoppingcart",
    "phone",
    "pushpin",
    "gift",
  ];

  const [users, setUsers] = useState([]);
  
 
  useEffect(()=>{

    const subscriber = Firebase.firestore()
    .collection("Users")
    .doc("Aliskanliklar")
    .collection("Aliskanliklar")

    .onSnapshot((querySnapshot) => {
      const users = [];

      querySnapshot.forEach((documentSnapshot) => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });



      setUsers(users);
    });

  
      return () =>subscriber();

})



renderList = (list) => {
  return <Zincir list={list} />;
};

  renderColor = () => {
    return backgroundColor.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={{
            width: 30,
            height: 30,
            borderRadius: 4,
            backgroundColor: color,
          }}
          onPress={() => setcolor(color)}
        />
      );
    });
  };

  renderIcon = () => {
    return icon.map((iconn) => {
      return (
        <TouchableOpacity
          key={iconn}
          onPress={() => seticon(iconn)}
      >
        <AntDesign name={iconn} size={40} color={color} />
        </TouchableOpacity>
      );
    });
  };

  
  createAliskanlik = () => {
 
    Firebase.firestore().collection("Users").doc("Aliskanliklar").collection("Aliskanliklar").doc(isim).set({
      name: isim,
      color:color,
      icon:iconn,

    })
    .then(function() {
     
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });


    Firebase.firestore().collection("Users").doc("Aliskanliklar").collection("Aliskanliklar").doc(isim).collection("Takip").doc(tarih).set({
      check:false
  
     })

   
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
      backgroundColor="orange" 
        placement="left"
        leftComponent={<FontAwesome name="chain" size={24} color="white" />}
        centerComponent={{ text: 'Alışkanlıklar', style: { color: '#fff',fontSize:25} }}
      />
          <View style={{ flex:1,justifyContent: "center", alignItems: "center" }}>
            <ScrollView>


            <View style={styles.listArea}>
                <FlatList
                data={users}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderList(item)}
                contentContainerStyle={{ flex: 1 }}
            />
            </View>
      
              <KeyboardAvoidingView style={styles.container} behavior="padding">



              <View style={{ alignSelf: "stretch", marginHorizonal: 32 }}>
                <Text style={styles.title}>Alışkanlık Ekle</Text>

              <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                <TextInput
                  style={styles.input}
                  placeholder="Alışkanlık Adı"
                  onChangeText={(isim) => setisim(isim)}
                />

              </View>

              <View style={ styles.colorContainer}>
                  <TouchableOpacity>
                    <FlatList
                      data={backgroundColor}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => renderColor(item)}
                    />
                  </TouchableOpacity>
                </View>


                <View style={styles.colorContainer}>
                  <TouchableOpacity>
                    <FlatList
                      data={icon}
                      horizontal={true}
                      showsHorizontalScrollIndicator={true}
                      renderItem={({ item }) => renderIcon(item)}
                    />
                  </TouchableOpacity>
                </View>       

                <TouchableOpacity
                  style={{
                    backgroundColor:color,
                    marginTop: 24,
                    height: 50,
                    borderRadius: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    width: 310,
                  }}
                  onPress={()=>createAliskanlik()}
                >
                  <Text style={{  color: "black", fontWeight: "700", fontSize: 25 }} >
                    Ekle
                  </Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>    
          </View>
    </View>
  );
}

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
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  listArea: {
    flex: 1,
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"pink",
    width:"100%",
    paddingHorizontal:"5%",
  },
});

export default Aliskanliklar;