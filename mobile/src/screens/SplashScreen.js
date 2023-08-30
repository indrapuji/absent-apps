import {SafeAreaView, StyleSheet, View, Image, StatusBar, Dimensions, KeyboardAvoidingView} from 'react-native'
import React from 'react'

const {width} = Dimensions.get('screen')

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='black' />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{alignItems: 'center'}}>
          <View>
            <Image style={styles.tinyLogo} source={require('../assets/intalourima-logo.png')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  tinyLogo: {
    width: 250,
    height: 250
  }
})
