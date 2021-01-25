import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal,Image,Button} from "react-native";
//import colors from "./Colors";
import {Ionicons} from "../node_modules/@expo/vector-icons";
import { Entypo } from "../node_modules/@expo/vector-icons";
import { AntDesign } from "../node_modules/@expo/vector-icons";
import Firebase from "../config/Firebase";

//disable yellow warnings on EXPO client!
console.disableYellowBox = true;

const TodoList = ({ list }) => {
  
  return (
   
    <View>
      <View
        style={[styles.listContainer]}
      >
        <View style={{flexDirection:"row", backgroundColor:"#adcceb"}}>
         
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

        </View>  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 15,
    borderRadius: 2,
    width: "100%",
    height:60,
    justifyContent:"space-between",
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"pink"
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

export default TodoList;