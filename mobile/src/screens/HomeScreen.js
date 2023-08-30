import React, {useContext, useState, useEffect, useRef} from 'react'
import {StyleSheet, Text, View, Dimensions, Animated, Modal, Pressable, StatusBar} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'
import {iphoneHasNotch} from '../utilities/DeviceInfo'
import HomeCarousel from '../components/HomeCarousel'
import moment from 'moment/moment'
import LargeButton from '../components/LargeButton'
import GetLocation from 'react-native-get-location'
import axios from 'axios'
import host from '../utilities/host'
import {useIsFocused} from '@react-navigation/native'
import {AuthContext} from '../components/Context'
import {launchCamera} from 'react-native-image-picker'
import 'moment/locale/id'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const size = Dimensions.get('screen').width
const {width} = Dimensions.get('screen')

const HomeScreen = ({navigation}) => {
  const {signOut} = useContext(AuthContext)
  const isFocused = useIsFocused()
  const [userEvent, setUserEvent] = useState()
  const [long, setLong] = useState()
  const [lat, setLat] = useState()
  const [dateNow, setDateNow] = useState()
  const [disable, setDisable] = useState(true)
  const [statusUser, setStatusUser] = useState(false)
  const [dt, setDt] = useState(new Date().toLocaleString())
  const [recordId, setRecordId] = useState()
  const [token, setToken] = useState()
  const [recordData, setRecordData] = useState()
  const [leaderBoard, setLeaderBoard] = useState()
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  const scroll = useRef(new Animated.Value(0)).current

  useEffect(() => {
    getRecordId()
    getData()
  }, [isFocused])

  useEffect(() => {
    socket.on('receive_leaderboard', (data) => {
      console.log('socket')
      setLeaderBoard(data)
    })
  }, [])

  useEffect(() => {
    getLeaderBoard()
  }, [dateNow, userEvent, token])

  useEffect(() => {
    getRecord()
  }, [recordId])

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date())
    }, 1000)
    return () => clearInterval(secTimer)
  }, [])

  const getDateFromUTC = (timeLoc) => {
    return moment.utc(timeLoc).format().slice(0, 10)
  }

  const getData = async () => {
    try {
      const event = await AsyncStorage.getItem('userEvent')
      const accessToken = await AsyncStorage.getItem('userToken')
      if (event !== null && accessToken !== null) {
        setUserEvent(event)
        setToken(accessToken)
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000
        })
          .then((location) => {
            setLat(location.latitude)
            setLong(location.longitude)
            setDateNow(getDateFromUTC(location.time))
            if (location.latitude && location.longitude && location.time) {
              setDisable(false)
            }
          })
          .catch((error) => {
            const {code, message} = error
            console.warn(code, message)
          })
      } else {
        signOut()
      }
    } catch (e) {
      console.log('ini', e)
    }
  }

  const getRecordId = async () => {
    try {
      const value = await AsyncStorage.getItem('userCheckin')
      if (value !== null) {
        setRecordId(Number(value))
      }
    } catch (e) {
      console.log('recordId', e)
    }
  }

  const getLeaderBoard = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: `${host}/record/leaderboard`,
        data: {
          tanggal: dateNow,
          event: userEvent
        },
        headers: {
          token: token
        }
      })
      setLeaderBoard(data)
      setLoading(false)
    } catch (error) {
      console.log('getLeaderBoard', error)
    }
  }

  const getRecord = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${host}/record/${recordId}`,
        headers: {token}
      })
      setRecordData(data)
      setStatusUser(true)
    } catch (error) {
      console.log(error)
    }
  }

  const changeFormat = (time) => {
    return moment().format('dddd, Do MMM YYYY')
  }

  const valTime = (newTime) => {
    return newTime < 10 ? '0' + newTime : newTime
  }

  const handleCheckin = () => {
    var hours = new Date().getHours() //To get the Current Hours
    var min = new Date().getMinutes() //To get the Current Minutes
    var sec = new Date().getSeconds() //To get the Current Seconds
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: width - 40,
        maxWidth: ((width - 40) / 4) * 3,
        quality: 1
      },
      (response) => {
        console.log(response.assets[0].uri)
        navigation.navigate('Checkin', {
          imageUri: response.assets[0].uri,
          event: userEvent,
          long,
          lat,
          dateNow,
          masuk: `${valTime(hours)}:${valTime(min)}:${valTime(sec)}`
        })
      }
    )
    socket.emit('get_leaderboard', {tanggal: dateNow, event: userEvent})
  }

  const handleCheckout = () => {
    setModalVisible(true)
  }

  const checkoutSession = async () => {
    try {
      var hours = new Date().getHours() //To get the Current Hours
      var min = new Date().getMinutes() //To get the Current Minutes
      var sec = new Date().getSeconds() //To get the Current Seconds
      await axios({
        method: 'PUT',
        url: `${host}/record/checkout`,
        data: {
          keluar: `${valTime(hours)}:${valTime(min)}:${valTime(sec)}`,
          recordId: Number(recordId)
        },
        headers: {
          token
        }
      })
      setStatusUser(false)
      await AsyncStorage.removeItem('userCheckin')
      setModalVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor='black' />
      <Animated.ScrollView
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scroll}}}], {
          useNativeDriver: true
        })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            {
              height: size * (3 / 4),
              width: size
            },
            {
              transform: [
                {
                  translateY: scroll.interpolate({
                    inputRange: [-size, 0, size, size + 1],
                    outputRange: [-size / 2, 0, size * 0.75, size * 0.75]
                  })
                },
                {
                  scale: scroll.interpolate({
                    inputRange: [-size, 0],
                    outputRange: [2 * 1.5, 1],
                    extrapolate: 'clamp'
                  })
                }
              ]
            }
          ]}
        >
          <HomeCarousel />
        </Animated.View>
        <View
          style={{
            backgroundColor: '#FFF',
            marginTop: -35,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingHorizontal: 20
          }}
        >
          <View
            style={{
              marginTop: 20,

              borderRadius: 20,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{fontSize: 10}}>EVENT ON GOING</Text>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: 'red'}}>{userEvent}</Text>
          </View>

          <View
            style={{
              marginVertical: 10,
              borderRadius: 20,
              paddingTop: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 10,
              backgroundColor: 'white'
            }}
          >
            <View style={{alignItems: 'center'}}>
              <Text>{changeFormat(dt)}</Text>
            </View>
            {statusUser ? (
              <View style={{flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
                <View style={{flex: 5, alignItems: 'center'}}>
                  <Text style={{fontSize: 28, fontWeight: 'bold'}}>{recordData.masuk}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{fontSize: 35, fontWeight: 'bold'}}>-</Text>
                </View>
                <View style={{flex: 5, alignItems: 'center'}}>
                  <Text style={{fontSize: 28, fontWeight: 'bold'}}>{moment().format('HH:mm:ss')}</Text>
                </View>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
                <View style={{flex: 5, alignItems: 'center'}}>
                  <Text style={{fontSize: 35, fontWeight: 'bold'}}>{moment().format('H:mm:ss')}</Text>
                </View>
              </View>
            )}
            <View style={{marginHorizontal: 16, marginTop: 20}}>
              <LargeButton
                actionButton={statusUser ? handleCheckout : handleCheckin}
                buttonText={statusUser ? 'Checkout' : 'Checkin'}
                disabled={disable}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Attendance Leaderboard</Text>
          </View>
          {loading ? (
            <View style={{height: 300, justifyContent: 'center', alignItems: 'center', paddingBottom: 200}}>
              <FastImage style={{width: 120, height: 120}} source={require('../assets/intalourima-loading.gif')} />
            </View>
          ) : (
            leaderBoard.map((item, index) => {
              return (
                <View
                  style={{
                    marginVertical: 10,
                    borderRadius: 20,
                    paddingVertical: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 10,
                    backgroundColor: 'white',
                    flex: 1,
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                  key={index}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{paddingHorizontal: 10}}>
                      <FastImage
                        style={{width: 30, height: 30, borderRadius: 100, borderWidth: 3}}
                        source={require('../assets/intalourima-logo.png')}
                      />
                    </View>
                    <View style={{}}>
                      <Text style={{fontSize: 20}}>{item.User.nama}</Text>
                      <Text style={{fontSize: 10}}>{item.User.role}</Text>
                    </View>
                  </View>
                  <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
                    <View>
                      <Text style={{fontSize: 18}}>{item.masuk}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          )}
        </View>
      </Animated.ScrollView>
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        // onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Yakin ingin Checkout</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={checkoutSession}>
                <Text style={styles.textStyle}>Iya</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Tidak</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 90
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 120,
    elevation: 2,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  buttonOpen: {
    backgroundColor: '#2196F3'
  },
  buttonClose: {
    backgroundColor: 'red'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
})
