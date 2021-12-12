/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image } from 'react-native';
export default function header() {
  return (
    <View style={{
      marginTop: 30,
      }}>
      <Image source={
        require('../header/images/leadster.png')} 
        style={{
          }} />
      <Text style={{
        fontWeight:'bold',
        fontSize: 30, 
        textAlign:'center',
        color: '#4299F6',
       }}>
        Album Teste
      </Text>
    </View>
  );
}
