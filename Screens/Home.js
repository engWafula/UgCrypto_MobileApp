import { View, Text,SafeAreaView,StyleSheet,Button, ScrollView } from 'react-native';
import React from 'react';
import { useGetCryptosQuery } from '../services/CryptoApi';
import { SectionGrid } from 'react-native-super-grid';
import millify from 'millify';
import Crypto from "./Crypto"
import News from "./News"


export default function Home() {

  const {data,isFetching} = useGetCryptosQuery(20);

  const globalStats =data?.data?.stats
  console.log(globalStats)




  if(isFetching) return  <Text>Loading</Text>
   
  console.log(data)
  return (
    <ScrollView>

    <SafeAreaView style={{flex:1}}>
    <View style={{alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.heading}>Global Crypto Stats</Text>
      </View>
      <View style={styles.container}>
      <SectionGrid
    
  itemDimension={130}
  sections={[
    {
      title: 'Total Cryptocurrencies',
      data: [globalStats.total],
    },
    {
      title: 'Exchanges',
      data: [globalStats.totalExchanges],
    },
    {
      title: 'Total Market Cap',
      data: [millify(globalStats.totalMarketCap)],
    }
  ]}
  renderItem={({ item }) => (<Text>{item}</Text>)}
  renderSectionHeader={({ section }) => (
    <Text style={{ fontSize: 10, flexDirection: "row", }}>{section.title}</Text>
  )}
/>
<SectionGrid
    
    itemDimension={130}
    sections={[
      {
        title: 'Total 24h Volume',
        data: [millify(globalStats.total24hVolume)],
      },
      {
        title: 'Exchanges',
        data: [globalStats.totalExchanges],
      },
      {
        title: 'Total Markets',
        data: [millify(globalStats.totalMarkets)],
      }
    ]}
    renderItem={({ item }) => (<Text>{item}</Text>)}
    renderSectionHeader={({ section }) => (
      <Text style={{ fontSize: 10, fontWeight:500 }}>{section.title}</Text>
    )}
  />
      </View>
      <View style={styles.cryptoHeader}>
        <Text style={{ fontSize: 20, fontWeight:500 }}>Top 10 cryptos in the world</Text>
      </View>
      <Crypto  simplified/>
      <View style={styles.newsHeader}>
        <Text style={{ fontSize: 20, fontWeight:500 }}>Latest Crypto News</Text>
      </View>
      <News  simplified/>
    </SafeAreaView>
    </ScrollView>
  );
}






const styles = StyleSheet.create({
  heading:{
    color:"blue",
    marginBottom:2,
    marginTop:10,
    fontWeight:"500",
    fontSize:20
  },
  container:{
    display:"flex",
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'space-evenly',
    
     marginLeft:30,
    padding:10
    },
    cryptoHeader:{
      alignItems:'center',
      justifyContent:'center'
    },
    newsHeader:{
      alignItems:'center',
      justifyContent:'center',
      marginTop:10,
      marginBottom:10
    }
});
