import { useCallback, useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { GlobalColors } from '../../Constants/colors'
import Buttons from '../UI/Buttons'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import { Place } from '../../models/place';


function PlaceForm ({onCreatePlace}) {
  const [enteredText, setenteredText] = useState()
  const [pickedLocation, setPickedLocation] = useState()
  const [SelectedImage, setSelectedImage] = useState()

  function ChangeTextHandler (text) {
    setenteredText(text)
  }

  function takeImageHandler (imageUri) {
    setSelectedImage(imageUri)
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  function savePlaceHandler () {
    const placeData = new Place(enteredText, SelectedImage, pickedLocation)
    onCreatePlace(placeData)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={ChangeTextHandler}
          value={enteredText}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler}/>
      <Buttons onPress={savePlaceHandler}>Add Place</Buttons>
    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: GlobalColors.primary500
  },
  input: {
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    borderBottomColor: GlobalColors.primary700,
    borderBottomWidth: 2,
    backgroundColor: GlobalColors.primary100
  }
})
