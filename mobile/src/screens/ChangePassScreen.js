import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import buttons from "../themes/buttons";
import colors from "../themes/colors";
import host from "../utilities/host";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("screen");

const ChangePassScreen = ({ navigation, route }) => {
  const { token } = route.params;
  const size = width - 50;
  const [newPass, setNewPass] = useState({
    pass: "",
    val: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [dis, setDis] = useState(true);

  const changePassword = async () => {
    try {
      const { data } = await axios({
        method: "PUT",
        url: `${host}/user/update-password`,
        data: { new_password: newPass.pass },
        headers: { token },
      });
      setMessage(data.msg);
      setModalVisible(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSuccess = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("Login");
  };

  const changeShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (newPass.pass !== "") {
      if (newPass.pass === newPass.val) {
        setDis(false);
      } else {
        setDis(true);
      }
    }
  }, [newPass.pass, newPass.val]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center", marginTop: 100 }}>
      <StatusBar barStyle="dark-content" />

      <View style={{}}>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
          Change your Password {"\n"}To Continue
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={require("../assets/change-password.png")} style={{ width: size, height: size }} />
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <TextInput
          placeholder="New Password"
          autoCapitalize="none"
          secureTextEntry={!show}
          style={{ ...styles.inputSize }}
          onChangeText={(text) => setNewPass({ ...newPass, pass: text })}
          value={newPass}
        />

        <View style={{ position: "relative" }}>
          <TextInput
            placeholder="Repeat New Password"
            autoCapitalize="none"
            secureTextEntry={!show}
            style={{ ...styles.inputSize, marginBottom: 20 }}
            onChangeText={(text) => setNewPass({ ...newPass, val: text })}
            value={newPass}
          />
          <TouchableOpacity style={{ position: "absolute", top: 15, right: 15 }} onPress={changeShow}>
            <Icon name={!show ? "eye-off" : "eye"} size={20} color={"blue"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={dis}
          onPress={changePassword}
          style={{ ...buttons.standartBotton, backgroundColor: dis ? colors.DISABLED : colors.SECONDARY }}
        >
          <Text style={{ color: colors.NETRAL }}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleSuccess}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSuccess}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChangePassScreen;

const styles = StyleSheet.create({
  inputSize: {
    width: width - 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 50,
    color: "blue",
    borderWidth: 1,
    borderColor: colors.SECONDARY,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 150,
    elevation: 2,
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
