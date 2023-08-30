import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TextCapsule = ({ ask, ans, tipe }) => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#EAEAEA",
          flexDirection: "row",
          borderRadius: 10,
          height: tipe ? tipe : 40,
          alignItems: "center",
          paddingLeft: 20,
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
        <View style={{ flex: 1 }}>
          <Text style={{ color: "red", fontWeight: "bold" }}>{ask}</Text>
        </View>
        <View style={{ flex: 2, alignItems: "flex-start", paddingRight: 13, flexDirection: "row" }}>
          <Text style={{ marginRight: 20, color: "red", fontWeight: "bold" }}>:</Text>
          <Text>{ans ? ans : "..."}</Text>
        </View>
      </View>
    </View>
  );
};

export default TextCapsule;

const styles = StyleSheet.create({});
