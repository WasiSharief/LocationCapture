import { useNavigation } from '@react-navigation/native'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { GlobalColors } from '../../Constants/colors'
import PlaceItem from './PlaceItem'

function PlacesList ({ places }) {

  const navigation = useNavigation();

  function selectPlaceHandler(id)
  {
    navigation.navigate('PlaceDetails', {
      placeId: id
    })
  }

  if (!places || places.length === 0) {
    return (
      <View style={[Styles.fallBackContainer]}>
        <Text style={Styles.fallbackText}>
          No Places added yet - start adding some!
        </Text>
      </View>
    )
  }

  return (
    <FlatList
    style={Styles.list}
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
    />
  )
}

export default PlacesList

const Styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  fallbackText: {
    fontSize: 16,
    color:GlobalColors.primary200 
  },
  list:{
    margin:15
  }
})
