import { Alert, Button, View, Image, StyleSheet, Text } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from 'react';
import { GlobalColors } from '../../Constants/colors';
import OutLinedButton from '../UI/OutLinedButtons';

function ImagePicker ({onTakeImage}) {

    const [ImagePicked, setImagePicked] = useState();
    const [cameraPermissionInformation, requsetPermession] = useCameraPermissions(); // for iOS Device

  async function verifyPermissions() // for iOS Device
  {
    if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED)
    {
       const response = await requsetPermession();
       
       return response.granted
    }

    if(cameraPermissionInformation.status === PermissionStatus.DENIED)
    {
        Alert.alert('Permisson Denied', 'You need to grant camera permissions')

        return false
    }

    return true

} 
    
  async function takeImageHandler () {  // for iOS and Android devices

   const hasPermission =  await verifyPermissions();

   if(!hasPermission)
   {
    return
   }
    
    const image = await launchCameraAsync({     // for Android devices
        allowsEditing:true,
        aspect:[16, 9],
        quality:0.5,
    })
    setImagePicked(image.uri)
    onTakeImage(image.uri)
}

let imagePreview = <Text> No Image's Taken Yet! </Text>

if(ImagePicked)
{
    imagePreview = <Image style={styles.image} source={{uri: ImagePicked}} />;
}

  return (
    <View>
        <View style={styles.ImagePreview}>{ imagePreview }</View>
      <OutLinedButton icon="camera"  onPress={takeImageHandler} > Take Image </OutLinedButton> 
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
    ImagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:GlobalColors.primary100,
        borderRadius:5,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    }

})