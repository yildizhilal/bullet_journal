import React,{useEffect, useState,useCallback} from 'react';
import { Text, View ,StyleSheet,FlatList} from 'react-native';

import { Feather  } from '@expo/vector-icons';
import { Header} from 'react-native-elements';
import moment from 'moment';
import Firebase from '../config/Firebase';
import { Badge } from 'react-native-paper';


const Mood = () => {

  var ay=moment().format("M");
  


 // var gun=moment().format("D");
  var ayKacCekti = new Date(2021, Number(ay), 0).getDate();
  const[moodlar,setMoodlar]=useState([])



  useEffect(()=>{

const subscriber=Firebase.firestore().collection("Users").doc("2021-02").collection("Mood")
.onSnapshot((querySnapshot) => {
  const users = [];

  querySnapshot.forEach((documentSnapshot) => {
    users.push({
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
    });
  });

  setMoodlar(users);
});

    return () => {subscriber();}
    },[500000])


  



  return (
    <View>
          <Header
      backgroundColor="orange" 
        placement="left"
        leftComponent={<Feather name="star" size={24} color="white" />}
        centerComponent={{ text: 'Mood', style: { color: '#fff',fontSize:25} }}
      /> 

         <Text>Bu Ay</Text>   
             <FlatList
                data={moodlar}
                horizontal={false}
                numColumns={7}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Badge size={45} style={{backgroundColor:item.mood}}>{item.key}</Badge>}
            />







 
</View>
  );
}

const styles =StyleSheet.create({
  
})

export default Mood;