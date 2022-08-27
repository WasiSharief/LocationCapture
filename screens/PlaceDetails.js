import { useEffect, useState } from 'react'
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native'
import OutLinedButton from '../components/UI/OutLinedButtons'
import { GlobalColors } from '../Constants/colors'
import { FetchPlaceDetails } from '../util/database';

function PlaceDetails ({ route, navigation }) {

   const [fetchedPlace, setFetchedPlace] = useState();
  
    function showOnMapHandler () {

        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng,
        });
  
    }

  const selectedPlacedId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData()
    {
      const place = await FetchPlaceDetails(selectedPlacedId)
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      })
    }

    loadPlaceData();
  }, [selectedPlacedId]);

  if(!fetchedPlace)
  {
    return <View style={styles.fallBack}>
        <Text>Loading Place Data...</Text>
    </View>
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutLinedButton icon='map' onPress={showOnMapHandler}>
          View on Map
        </OutLinedButton>
      </View>
    </ScrollView>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({

    fallBack:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    image:{
        height: '35%',
        minHeight:300,
        width:'100%'
    },
    locationContainer:{
        justifyContent:'center',
        alignItems:'center',

    },
    addressContainer:{
         padding:20,
    },
    address:{
        color: GlobalColors.primary500,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16
    }
})