import { StyleSheet, View, Alert, Image, Text } from 'react-native'
import { GlobalColors } from '../../Constants/colors'
import OutLinedButton from '../UI/OutLinedButtons'
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus
} from 'expo-location'
import { useEffect, useState } from 'react'
import { getAddress, getMapPreview } from '../../util/Location'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'

function LocationPicker ({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState()

  const isFocused = useIsFocused()

  const navigate = useNavigation()

  const route = useRoute()

  const [
    locationPermissionInformation,
    requsetPermession
  ] = useForegroundPermissions()

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      }
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng)

      onPickLocation({ ...pickedLocation, address: address }); 
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation])

  async function verifyPermessions () {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const response = await requsetPermession()

      return response.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      
      const response = await requsetPermession()
      Alert.alert('Permisson Denied', 'You need to grant location permissions')

      return false
    }

    return true
  }

  async function getLocationHandler () {
    const hasPermission = await verifyPermessions()
    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  function pickOnMapHandler () {
    navigate.navigate('Map')
  }

  let locationPreview = <Text>No location Picked</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutLinedButton icon='location' onPress={getLocationHandler}>
          Locate User
        </OutLinedButton>
        <OutLinedButton icon='map' onPress={pickOnMapHandler}>
          Pick On Map
        </OutLinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.primary100,
    borderRadius: 5,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})
