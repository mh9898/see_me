import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice } from 'react-native-vision-camera'


const MyPhoto = () => {
    
    const device = useCameraDevice('back')
    const cameraRef = useRef<Camera>(null)
    const [photoStatus, setPhotoStatus] = useState<boolean>(true);
    const [photoPath, setPhotoPath] = useState<string>();

    const checkPermission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()

        if (newCameraPermission == null) {
            Alert.alert("Camera not ready")
        }

        if (newMicrophonePermission == null) {
            Alert.alert("Mic not ready")
        }
    }

    useEffect(() => {
        checkPermission();
    }, []);
    if (device == null) { return <ActivityIndicator /> }

    const takePhoto = async () => {
        const photo = await cameraRef.current?.takePhoto()
        setPhotoPath(photo?.path.toString());
        setPhotoStatus(true);
    }

    const openPhoto = () => {
        setPhotoStatus(false);
    }

  return (
    <View style={styles.container}>
        <Text>MY photo</Text>
        { photoStatus ? 
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:"file://"+photoPath}}/>
            <TouchableOpacity style={styles.openButton} onPress={openPhoto}>
                <Text>Open Photo</Text>
            </TouchableOpacity>
        </View>
        :
      <View style={styles.container}>
      <Camera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      photo={true}
    />
    <TouchableOpacity style={styles.button} onPress={takePhoto}/>
      </View>
}
    </View>
  )
}

export default MyPhoto

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    button:{
        width: 60,
        height: 60,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        borderRadius: 30,
    },
    image:{
        width: '100%',
        height: '70%',
    },
    openButton:{
        alignSelf: 'center',
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 30,
        borderRadius: 30,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 15,
        color: 'white',
    }
})