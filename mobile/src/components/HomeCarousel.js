import React from 'react'
import {StyleSheet, View, Dimensions, Text} from 'react-native'
// import { withNavigation } from "@react-navigation/compat";

import FastImage from 'react-native-fast-image'

const width = Dimensions.get('screen').width
const height = width * (3 / 4)

const HomeCarousel = ({}) => {
  return (
    <View
      style={{
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
      }}
    >
      <View style={{height, width, backgroundColor: 'black', alignItems: 'center'}}>
        <View style={{paddingTop: 32}}>
          <View style={{alignItems: 'center'}}>
            <FastImage style={{width: 150, height: 150}} source={require('../assets/intalourima-logo.png')} />
            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>INTALOURIMA GUARD</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// export default withNavigation(HomeCarousel);
export default HomeCarousel

const styles = StyleSheet.create({})
