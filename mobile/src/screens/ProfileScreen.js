import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import host from "../utilities/host";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import TextCapsule from "../components/TextCapsule";
import LargeButton from "../components/LargeButton";
import { AuthContext } from "../components/Context";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [profileData, setProfileData] = useState([]);
  const [pengawas, setPengawas] = useState(null);
  const [koordinator, setKoordinator] = useState(null);
  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    wait(2000).then(() => setLoading(false), getData());
  }, []);

  useEffect(() => {
    getData();
  }, [isFocused]);

  useEffect(() => {
    setLoading(false);
  }, [profileData !== null]);

  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("userToken");
      if (accessToken !== null) {
        const { data } = await axios({
          method: "GET",
          url: `${host}/user/profile`,
          headers: { token: accessToken },
        });
        setProfileData(data);
        setPengawas(data.pengawas);
        setKoordinator(data.koordinator);
        setLeader(data.leader);
      }
    } catch (e) {
      console.log("==> e", e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor={"transparent"} />}
      >
        {loading || profileData === null ? (
          <View style={{ height: 300, justifyContent: "center", alignItems: "center", paddingBottom: 200 }}>
            <FastImage style={{ width: 120, height: 120 }} source={require("../assets/intalourima-loading.gif")} />
          </View>
        ) : (
          <View style={{ marginHorizontal: 16 }}>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              {profileData.img_url ? (
                <FastImage
                  style={{ width: 120, height: 120, borderRadius: 100, borderWidth: 3 }}
                  source={{ uri: profileData.img_url }}
                />
              ) : (
                <FastImage
                  style={{ width: 120, height: 120, borderRadius: 100, borderWidth: 3 }}
                  source={require("../assets/intalourima-logo.png")}
                />
              )}
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>{profileData.nama}</Text>
                <Text style={{ fontSize: 15 }}>{profileData.role}</Text>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <TextCapsule ask={"Email"} ans={profileData.email} />
              <TextCapsule
                ask={"Alamat"}
                ans={profileData.alamat}
                tipe={profileData.alamat && profileData.alamat.length > 25 ? 80 : 40}
              />
              <TextCapsule ask={"Telp"} ans={profileData.no_telp} />
              <TextCapsule ask={"Date of Birth"} ans={profileData.ttl} />
              <TextCapsule ask={"No Rek"} ans={profileData.no_rek} />
            </View>

            <View
              style={{
                marginVertical: 20,
                alignItems: "center",
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 10,
                backgroundColor: "white",
              }}
            >
              <View style={{ marginTop: 20 }} />
              <Text style={{ fontWeight: "bold" }}>Struktur</Text>

              {pengawas && (
                <View style={{ marginTop: 20 }}>
                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center", borderWidth: 1, width: 200, height: 40 }}
                    >
                      <Text style={{ fontWeight: "bold" }}>{pengawas && pengawas.nama}</Text>
                      <Text style={{ fontSize: 10 }}>Pengawas</Text>
                    </View>
                  </View>
                </View>
              )}
              {koordinator && (
                <View style={{ alignItems: "center" }}>
                  <View style={{ height: 20, borderWidth: 1 }} />
                  <View
                    style={{ alignItems: "center", justifyContent: "center", borderWidth: 1, width: 200, height: 40 }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{koordinator && koordinator.nama}</Text>
                    <Text style={{ fontSize: 10 }}>Koordinator</Text>
                  </View>
                </View>
              )}
              {leader && (
                <View style={{ alignItems: "center" }}>
                  <View style={{ height: 20, borderWidth: 1 }} />
                  <View
                    style={{ alignItems: "center", justifyContent: "center", borderWidth: 1, width: 200, height: 40 }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{leader && leader.nama}</Text>
                    <Text style={{ fontSize: 10 }}>Leader</Text>
                  </View>
                </View>
              )}
              <View style={{ alignItems: "center" }}>
                {profileData.role === "super-admin" || profileData.role === "pengawas" ? (
                  <View style={{ marginTop: 20 }} />
                ) : (
                  <View style={{ height: 20, borderWidth: 1 }} />
                )}
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    width: 200,
                    height: 40,
                    backgroundColor: "yellow",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{profileData && profileData.nama}</Text>
                  <Text style={{ fontSize: 10 }}>{profileData.role}</Text>
                </View>
              </View>
              <View style={{ marginBottom: 20 }} />
            </View>

            <View style={{}}>
              <LargeButton actionButton={signOut} buttonText={"Logout"} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
