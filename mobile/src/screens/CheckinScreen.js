import {StyleSheet, Text, SafeAreaView, View, Dimensions} from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import host from '../utilities/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import LargeButton from '../components/LargeButton'

import FastImage from 'react-native-fast-image'

const {width} = Dimensions.get('screen')

const CheckinScreen = ({route, navigation}) => {
  const {imageUri, event, lat, long, dateNow, masuk} = route.params
  const [token, setToken] = useState()

  const [value, setValue] = useState({
    event: event,
    long: long,
    lat: lat,
    masuk: masuk,
    tanggal: dateNow,
    image_url: null
  })

  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken')

      if (accessToken !== null) {
        setToken(accessToken)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const recordData = async () => {
    try {
      const urlImage = {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'checkin.jpg'
      }
      var formData = new FormData()
      if (imageUri) formData.append('image_url', urlImage)
      for (let key in value) {
        formData.append(`${key}`, value[key])
      }
      console.log('ini')
      const {data} = await axios({
        method: 'POST',
        url: `${host}/record/checkin`,
        data: formData,
        headers: {
          token: token,
          'content-type': 'multipart/form-data'
        }
      })
      await AsyncStorage.setItem('userCheckin', JSON.stringify(data.id))
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black', alignItems: 'center', paddingTop: 20}}>
      <FastImage
        source={{uri: imageUri}}
        style={{
          width: width - 40,
          height: ((width - 40) / 4) * 5.25,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'white'
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={{paddingVertical: 50, alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{moment(dateNow).format('LL')}</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{event}</Text>
      </View>
      <View style={{width: width - 32}}>
        <LargeButton actionButton={recordData} buttonText={'Checkin'} />
      </View>
    </SafeAreaView>
  )
}

export default CheckinScreen

const styles = StyleSheet.create({})
