import React, {useState, useRef} from "react";
import {ActivityIndicator, Alert, TextInput} from "react-native";
import styled from "styled-components/native";
import {BLACK_COLOR} from "../colors";
import auth from "@react-native-firebase/auth";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const TxtInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
const Join = () => {
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //제출시 어떻게 행동할 것인지
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };

  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form.");
      if (loading) {
        return;
      }
    }
    try {
      //firebase를 이용한 계정 생성
      await auth().createUserWithEmailAndPassword(email, password);
      console.log(userCredential);
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password": {
          Alert.alert("Write a stronger password");
        }
      }
    }
  };
  return (
    <Container>
      <TxtInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        //제출시 어떻게 할 것인지?
        onSubmitEditing={onSubmitEmailEditing}
      />
      <TxtInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Create Account</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Join;
