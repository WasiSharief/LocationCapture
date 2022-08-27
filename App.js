import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/UI/IconsButton'
import { GlobalColors } from './Constants/colors'
import Map from './screens/Map'
import { useEffect, useState } from 'react'
import { init } from './util/database'
import AppLoading from 'expo-app-loading'
import PlaceDetails from './screens/PlaceDetails'

const Stack = createNativeStackNavigator()

export default function App () {
  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (!dbInitialized) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalColors.primary500 },
            headerTintColor: GlobalColors.gray700,
            contentStyle: { backgroundColor: GlobalColors.gray700 }
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favourite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  name='add'
                  color={tintColor}
                  size={24}
                  onPress={() => {
                    navigation.navigate('AddPlace')
                  }}
                />
              )
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{ title: 'Add a New Place' }}
          />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{
              title: 'Loading Place...'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
