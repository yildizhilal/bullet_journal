import React, { Component, useEffect, useState } from 'react';
import { View ,Text,StyleSheet, Button,Modal,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import Firebase from '../config/Firebase'
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

import AliskanliklarList from '../components/AliskanliklarList';

import Hedef from '../components/Hedef';
import { FontAwesome5,AntDesign } from '@expo/vector-icons';


let datesWhitelist = [
  {
    start: new Date(2021, 0, 1,),
    end: moment().add(365, 'days'), // total 4 days enabled
  },
];
let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled



const locale = {
              name: 'tr',
              config: {
                  months : "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
                  monthsShort : "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
                  weekdays : "Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi_Pazar".split("_"),
                  weekdaysShort : "Paz_Pzt_Sal_Çar_Per_Cum_Cmt".split("_"),
                  weekdaysMin : "Paz_Pzt_Sal_Çar_Per_Cum_Cmt".split("_"),
                  longDateFormat : {
                      LT : "HH:mm",
                      LTS : "HH:mm:ss",
                      L : "DD/MM/YYYY",
                      LL : "D MMMM YYYY",
                      LLL : "D MMMM YYYY LT",
                      LLLL : "dddd D MMMM YYYY LT"
                  },
                  calendar : {
                      sameDay: "[Aujourd'hui à] LT",
                      nextDay: '[Demain à] LT',
                      nextWeek: 'dddd [à] LT',
                      lastDay: '[Hier à] LT',
                      lastWeek: 'dddd [dernier à] LT',
                      sameElse: 'L'
                  },
                  relativeTime : {
                      future : "dans %s",
                      past : "il y a %s",
                      s : "quelques secondes",
                      m : "une minute",
                      mm : "%d minutes",
                      h : "une heure",
                      hh : "%d heures",
                      d : "un jour",
                      dd : "%d jours",
                      M : "un mois",
                      MM : "%d mois",
                      y : "une année",
                      yy : "%d années"
                  },
                  ordinalParse : /\d{1,2}(er|ème)/,
                  ordinal : function (number) {
                      return number + (number === 1 ? 'er' : 'ème');
                  },
                  meridiemParse: /PD|MD/,
                  isPM: function (input) {
                      return input.charAt(0) === 'M';
                  },
                  // in case the meridiem units are not separated around 12, then implement
                  // this function (look at locale/id.js for an example)
                  // meridiemHour : function (hour, meridiem) {
                  //     return /* 0-23 hour, given meridiem token and hour 1-12 */
                  // },
                  meridiem : function (hours, minutes, isLower) {
                      return hours < 12 ? 'PD' : 'MD';
                  },
                  week : {
                      dow : 1, // Monday is the first day of the week.
                      doy : 4  // The week that contains Jan 4th is the first week of the year.
                  }
              }
          };


 const Anasayfa=() => {


  
  const [addFlowersVisible, setFlowers] = useState(false);

  const [modalData, setModalData] = useState("25 Ocak 2021");
  const [users, setUsers] = useState([]);
  const [Aliskanliklar, setAliskanliklar] = useState([]);
  
  const [Hedefler, setHedef] = useState([]);

  const [ay, setAy] = useState("2021-02");


    useEffect(()=>{

      setAy(modalData.substring(0,7))
    
        const subscriber = Firebase.firestore()
        .collection("Users")
        .doc(ay)
        .collection(modalData)
        .doc("Todo")
        .collection("Todo")
     
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

         
    const subscriber2 = Firebase.firestore()
    .collection("Users")
    .doc("Aliskanliklar")
    .collection("Aliskanliklar")

    .onSnapshot((querySnapshot) => {
      const aliskanlik = [];

      querySnapshot.forEach((documentSnapshot) => {
        aliskanlik.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setAliskanliklar(aliskanlik);
    });
        

    const subscriber3 = Firebase.firestore()
    .collection("Users")
    .doc("Hedefler")
    .collection("Hedefler")
    .where("complate", "==", false)
    .onSnapshot((querySnapshot) => {
      const hedef = [];

      querySnapshot.forEach((documentSnapshot) => {
        hedef.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setHedef(hedef);
    });
        


          toggleAddFlowersModal = () => {
            setFlowers(true);
          };
        
          closeModal = () => {
            setFlowers(false);
          };


          return () => {subscriber(); subscriber2(); subscriber3();}

    },[modalData])


    renderList = (list) => {
        return <TodoList list={list} />;
      };

      renderAliskanliklarList = (list) => {
        return <AliskanliklarList  list={list}  />;
      };

      renderHedefler = (list) => {
        return <Hedef  list={list}  />;
      };

      const mood=(item)=>{

        Firebase.firestore().collection("Users").doc(ay).collection(modalData).doc("Mood").set({
          mood: item,
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

      }



    return (

        
      <View style={{ flex: 1 }}>


    <Modal
      animationType="slide"
      visible={addFlowersVisible}
      onRequestClose={()=>toggleAddFlowersModal()}
    >
      <AddTodo props={modalData} props2={ay} />
    </Modal>





        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'background',
            duration: 200,
            borderWidth: 1,
            highlightColor: 'grey',
          }}
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'orange'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: 'yellow' }}
          highlightDateNameStyle={{ color: 'yellow' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
          datesWhitelist={datesWhitelist}
          locale={locale}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={(date) => setModalData(date.format("YYYY-MM-DD"))}
          
          
        //  showDate={false}  ocak,subat 
        /><ScrollView>


          <View style={{paddingHorizontal:15 ,paddingTop:5}}>
          <Button title="BAS" onPress={()=>toggleAddFlowersModal()}/>
            <View style={styles.listArea}>
                <FlatList
                data={users}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderList(item)}
            />
            </View>
            <Text style={{backgroundColor:"black",color:"white", fontSize:25}}>ALIŞKANLIKLAR</Text>
            <View style={styles.listAreaAliskanliklar}>
              
                <FlatList
                data={Aliskanliklar}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderAliskanliklarList(item)}
            />
            </View>

            <Text style={{backgroundColor:"black",color:"white", fontSize:25}}>Hedefler</Text>
            <View style={styles.listAreaAliskanliklar}>
              
                <FlatList
                data={Hedefler}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderHedefler(item)}
            />
            </View>

          </View>
          <Text style={{backgroundColor:"black",color:"white", fontSize:25}}>Günlük Mood</Text>
            <View style={[styles.listAreaAliskanliklar,{flexDirection:"row",backgroundColor:"#FCE4EC", justifyContent:"space-around"}]}>
               <TouchableOpacity onPress={()=>mood(1)}>
                 <FontAwesome5 name="sad-cry" size={45} color="red"  />
               </TouchableOpacity>

               <TouchableOpacity  onPress={()=>mood(2)}>
               <AntDesign name="frowno" size={45} color="#E65100" />
               </TouchableOpacity>

               <TouchableOpacity  onPress={()=>mood(3)}>
                 <AntDesign name="meh" size={45} color="#FFB300" />
               </TouchableOpacity>

               <TouchableOpacity  onPress={()=>mood(4)}>
                 <AntDesign name="smileo" size={45} color="#66BB6A" />
               </TouchableOpacity>

               <TouchableOpacity  onPress={()=>mood(5)}>
                <FontAwesome5 name="laugh-beam" size={45} color="green" /> 
               </TouchableOpacity>
            </View>

   
         
          </ScrollView>
      </View>
    );
  
}


const styles = StyleSheet.create({

    listArea: {
      flex: 1,
      justifyContent:"center",
      alignContent:"center",
      backgroundColor:"pink",
      width:"100%",
      paddingHorizontal:"5%",
    },
    listAreaAliskanliklar: {
      flex: 1,
      justifyContent:"center",
      alignContent:"center",
      backgroundColor:"blue",
      width:"100%",
      paddingHorizontal:"5%",
    },
    listArea2: {
        flex: 1,
        justifyContent:"center",
        alignContent:"center",
        backgroundColor:"orange"
      },
  


  
  });

export default Anasayfa;