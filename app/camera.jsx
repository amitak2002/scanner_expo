import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function App() {
  const router = useRouter();

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState(0);

  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState('');
  const [barcodeData, setBarcodeData] = useState(null);
  const [flash , setFlash] = useState(false)

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    setFlash(true)
    if (cameraRef.current) {
      const clickedPhoto = await cameraRef.current.takePictureAsync();
      console.log('clicked photo : ', clickedPhoto);
      setPhoto(clickedPhoto.uri);
    }
    setFlash(false)
  }

  function handleBarcode({ type, data }) {
    setFlash(true)
    console.log('barcode data is : ', data);
    setBarcodeData(data);
    setFlash(false)
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        zoom={zoom}
        ref={cameraRef}
        onBarcodeScanned={handleBarcode}
        torch={flash}
      >
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.topButton} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Photo URI:</Text>
          <Text style={styles.infoValue}>{photo || 'No Photo'}</Text>

          <Text style={styles.infoText}>Barcode:</Text>
          <Text style={styles.infoValue}>{barcodeData || 'No Barcode Scanned'}</Text>
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#1FB28A"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#1FB28A"
            value={zoom}
            onValueChange={setZoom}
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <Text style={styles.captureButtonText}>Capture Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background behind camera
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  permissionMessage: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
  },
  topContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButton: {
    backgroundColor: '#00000088',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: '#00000088',
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    color: '#bbb',
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#1FB28A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
