import React, {useState, useContext} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native'
import axios from 'axios'
import host from '../utilities/host'
import {AuthContext} from '../components/Context'
import Icon from 'react-native-vector-icons/Ionicons'
import LargeButton from '../components/LargeButton'

const {width} = Dimensions.get('screen')

const Login = ({navigation}) => {
  const [failed, setFailed] = useState(false)
  const [value, setValue] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)

  const {signIn} = useContext(AuthContext)

  const failLogin = () => {
    setFailed(true)
    setTimeout(() => {
      setFailed(false)
    }, 2000)
  }

  const changeShow = () => {
    setShow(!show)
  }

  const loginHanddle = async (email, password) => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: `${host}/user/login`,
        data: {
          email,
          password
        }
      })
      console.log(data)
      if (!data.status) {
        console.log('false')
        setValue({...value, email: '', password: ''})
        setShow(false)
        navigation.navigate('ChangePass', {token: data.accessToken})
      } else {
        console.log(data.accessToken, data.role, data.nama, data.status, data.event)
        signIn(data.accessToken, data.role, data.nama, data.status, data.event)
      }
    } catch (error) {
      setMessage(error.response.data.msg)
      failLogin()
      console.log(error)
      console.log('ini')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='black' />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1, marginTop: 100}}>
            <Image style={styles.tinyLogo} source={require('../assets/intalourima-logo.png')} />
            <Text style={styles.title}>Intalourima</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            {failed && (
              <View style={{marginBottom: 10}}>
                <Text style={{color: 'red'}}>{message}</Text>
              </View>
            )}
            <TextInput
              placeholder='Enter Your email'
              autoCapitalize='none'
              underlineColorAndroid='transparent'
              style={styles.inputSize}
              onChangeText={(text) => setValue({...value, email: text})}
              value={value.email}
            />
            <View style={{position: 'relative', marginBottom: 30}}>
              <TextInput
                placeholder='Enter Your Password'
                autoCapitalize='none'
                secureTextEntry={!show}
                style={styles.inputSize}
                onChangeText={(text) => setValue({...value, password: text})}
                value={value.password}
              />
              <TouchableOpacity style={{position: 'absolute', top: 15, right: 15}} onPress={changeShow}>
                <Icon name={!show ? 'eye-off' : 'eye'} size={20} color={'red'} />
              </TouchableOpacity>
            </View>

            <LargeButton actionButton={() => loginHanddle(value.email, value.password)} buttonText={'Login'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontWeight: '700',
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    marginBottom: 50
  },
  tinyLogo: {
    width: 200,
    height: 200
  },
  inputSize: {
    width: width - 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 50,
    color: 'blue'
  }
})
