import { View, Text,Picker,StyleSheet,ScrollView,Image } from 'react-native';
import React,{useState} from 'react';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

import { useGetCryptosQuery } from '../services/CryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  if (!cryptoNews?.value) return "Loading"

  console.log(data)
  return (
    <>
              {!simplified && (
        <View style={styles.searchCrypto}>
          <Picker
            style={styles.input}
            placeholder="Search Cryptocurrency"
            onChangeText={(e)=> setSearchTerm(e)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
                <Picker.Item label="Cryptocurrency" value="Cryptocurrency" />
                {data?.data?.coins?.map((currency) => <Picker.Item value={currency.name} label={currency.name}/>)}
        </Picker>
        </View>
      )}

    <ScrollView>
    <View style={styles.container}>
      {cryptoNews.value.map((news, i)=>
      <Card style={styles.card}>
        <View style={{flexDirection:"row" ,justifyContent:"space-between",display:"flex"}}>
        <Card.Title style={{flexDirection:'row',justifyContent:"space-between"}}>{news.name}</Card.Title>
        <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri:news?.image?.thumbnail?.contentUrl}}
              />
              </View>
              <Card.Divider />
       
            <View  style={styles.user}>
              <Text style={styles.name}>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</Text>
            
             <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={styles.name}>{news.provider[0]?.name}</Text>
              <Text style={styles.name}>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </View>
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
    height:100,
    width:100,
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
