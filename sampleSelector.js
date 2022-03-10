import React from 'react'
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";
 export default function sampleSelector () {
     return (
         <View style={styles.container}>
             <Text>Hello World!</Text>
             <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "JavaScript", value: "JavaScript" },
                     { label: "TypeScript", value: "TypeScript" },
                 ]}
             />
         </View>
     );
 }
 const styles = StyleSheet.create({
     container : {
         flex            : 1,
         backgroundColor : "#fff",
         alignItems      : "center",
         justifyContent  : "center",
     },
 });