import styled from "styled-components";
import React, {useEffect, useRef} from "react";
import {Animated, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

//애니메이션을 줄 수 있는 컴포넌트
const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  align-items: center;
`;
const CoinName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const CoinSymbol = styled.Text`
  color: white;
`;

export const Icon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Coin = ({symbol, id, index}) => {
  //스크린에 있지 않고 컴포넌트에 있기 때문에 navigation 훅 사용
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  //애니메이션 주기
  useEffect(() => {
    Animated.spring(opacity, {
      //하나씩 나타나도록
      toValue: 1,
      useNativeDriver: true,
      //delay
      delay: index * 200,
    }).start();
  }, []);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  return (
    <TouchableOpacity
      style={{flex: 0.31}}
      onPress={() => navigation.navigate("Detail", {symbol, id})}
    >
      <Wrapper style={{opacity, transform: [{scale}]}}>
        <Icon
          source={{
            uri: `https://static.coinpaprika.com/coin/${id}/logo.png`,
          }}
        />
        <CoinName>{symbol}</CoinName>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default Coin;
