import auth from "@react-native-firebase/auth";
import React, {useEffect} from "react";
import {StyleSheet} from "react-native";

export default function App() {
  useEffect(() => {
    console.log(auth().currentUser);
  }, []);
  return null;
}
