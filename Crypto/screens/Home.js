import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {coins} from "../api";
import {BLACK_COLOR} from "../colors";
import {useQuery} from "react-query";
import {ActivityIndicator, FlatList, View} from "react-native";
import Coin from "../components/Coin";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`;

const Home = () => {
  const {isLoading, data} = useQuery("coins", coins);
  const [cleanData, setCleanData] = useState([]);
  console.log(cleanData.length);
  useEffect(() => {
    if (data) {
      setCleanData(
        data.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
      );
    }
  }, [data]);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color="white" size="large" />
      </Loader>
    );
  }
  return (
    <Container>
      <List
        data={cleanData}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        //column의 수
        //column을 정한만큼 view가 감싸고 있음
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        //item을 받아서 item의 id를 리턴해줌
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <Coin index={index} symbol={item.symbol} id={item.id} />
        )}
      />
    </Container>
  );
};

export default Home;
