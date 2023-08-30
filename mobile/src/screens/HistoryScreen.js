import {SafeAreaView, StyleSheet, Text, View, SectionList} from 'react-native'
import React, {useEffect, useState} from 'react'
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import host from '../utilities/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useIsFocused} from '@react-navigation/native'

const Capsule = ({dataItem}) => (
  <View
    style={{
      marginVertical: 7,
      borderRadius: 20,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 5,
      backgroundColor: 'white',
      borderColor: 'green',
      borderWidth: 1,
      flex: 1,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16
    }}
  >
    <View style={{paddingHorizontal: 10}}>
      <FastImage
        style={{width: 30, height: 30, borderRadius: 100, borderWidth: 3}}
        source={require('../assets/intalourima-logo.png')}
      />
    </View>

    <View>
      <Text style={{fontSize: 20}}>{dataItem.tanggal}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 10}}>{dataItem.masuk}</Text>
        <Text style={{fontSize: 10, marginHorizontal: 5}}>-</Text>
        <Text style={{fontSize: 10}}>{dataItem.keluar}</Text>
      </View>
    </View>
  </View>
)

const HistoryScreen = () => {
  const isFocused = useIsFocused()
  const [token, setToken] = useState()
  const [dataHistory, setDataHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [isFocused])

  useEffect(() => {
    getHistory()
  }, [token])

  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('userToken')
      if (accessToken !== null) {
        setToken(accessToken)
      }
    } catch (e) {
      // error reading value
    }
  }

  const getHistory = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${host}/record/history`,
        headers: {
          token: token
        }
      })
      setDataHistory(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>History</Text>
      </View>
      {loading ? (
        <View style={{height: 300, justifyContent: 'center', alignItems: 'center', paddingBottom: 200}}>
          <FastImage style={{width: 120, height: 120}} source={require('../assets/intalourima-loading.gif')} />
        </View>
      ) : (
        <SectionList
          sections={dataHistory}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Capsule dataItem={item} />}
          renderSectionHeader={({section: {title}}) => <Text style={{...styles.header}}>{title}</Text>}
        />
      )}
    </SafeAreaView>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingTop: 10
  }
})
