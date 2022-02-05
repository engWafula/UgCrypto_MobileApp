import { View,StyleSheet,ScrollView,Image,TextInput } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import React,{useEffect,useState} from 'react';
import { useGetCryptosQuery } from '../services/CryptoApi';
import millify from "millify"

export default function Crypto({ simplified}) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading..."
  return (
    <>
              {!simplified && (
        <View style={styles.searchCrypto}>
          <TextInput
            style={styles.input}
            placeholder="Search Cryptocurrency"
            onChangeText={(e)=> setSearchTerm(e)}
          />
        </View>
      )}

    <ScrollView>
    <View style={styles.container}>
      {cryptos?.map((currency)=>
      <Card style={styles.card}>
        <View style={{flexDirection:"row" ,justifyContent:"space-between"}}>
        <Card.Title style={{flexDirection:'row',justifyContent:"space-between"}}>{`${currency.rank}. ${currency.name}`}</Card.Title>
        <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri:currency.iconUrl}}
              />
              </View>
        <Card.Divider />
       
            <View  style={styles.user}>
              <Text style={styles.name}>Price: {millify(currency.price)}</Text>
              <Text style={styles.name}>Market Cap: {millify(currency.marketCap)}</Text>
              <Text style={styles.name}>Daily Change: {currency.change}%</Text>
            </View>
      </Card>
       ) }
      </View>
      </ScrollView>
      </>
  );
}



const styles = StyleSheet.create({
  card:{
    width:50
  },
  container: {
    flex: 1,
    
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  image: {
    width:30,
    marginLeft: 50,
  },
  name: {
    fontSize: 16,
    marginTop: 8,
  },
  searchCrypto:{
   marginTop:20,
    width: 250,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:30,
 
  
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});
