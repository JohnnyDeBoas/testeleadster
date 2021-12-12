/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text} from 'react-native';
export default function footer() {
  return (
    <View>
      <Text style={{
        fontWeight:'bold',
        fontSize: 10, 
        color: '#95A5A6',
       }}>
        Powered by João Lucas
      </Text>
    </View>
  );
}