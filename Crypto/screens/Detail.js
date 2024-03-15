import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import styled from "styled-components/native";
import {history, info} from "../api";
import {Icon} from "../components/Coin";
import {VictoryChart, VictoryLine, VictoryScatter} from "victory-native";
import {BLACK_COLOR} from "../colors";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Detail = ({
  //coin과 달리 screen에 있기에 navigation 속성을 받아옴
  navigation,
  route: {
    params: {symbol, id},
  },
}) => {
  useEffect((id) => {
    //네비게이션 커스텀
    navigation.setOptions({
      headerTitle: (id) => (
        <Icon
          source={{
            uri: `https://static.coinpaprika.com/coin/${id}/logo.png`,
          }}
        />
      ),
    });
  }, []);
  const {isLoading: infoLoading, data: infoData} = useQuery(
    ["coinInfo", id],
    info
  );
  const {isLoading: historyLoading, data: historyData} = useQuery(
    ["coinHistory", id],
    history
  );

  const [victoryData, setVictoryData] = useState(null);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        }))
      );
    }
  }, [historyData]);
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation="monotoneX"
            data={victoryData}
            style={{data: {stroke: "#1abc9c"}}}
          />
          <VictoryScatter
            data={victoryData}
            style={{data: {fill: "#1abc9c"}}}
          />
        </VictoryChart>
      ) : null}
    </Container>
  );
};

export default Detail;
