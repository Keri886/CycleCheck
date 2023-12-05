import { View, Text } from 'react-native'
import React from 'react'

export default function Calendar({navigation}){
  return (
    <View style= {{flex: 1, alignItems: 'center', justifyContent:'center'}}>
      <Text
      onPress={() => navigation.navigate('Home')}>Calendar Screen</Text>
    </View>
  )
}