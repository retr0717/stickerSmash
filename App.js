import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ViewComponent } from "react-native";
import * as ImagePicker from "expo-image-picker";

//components
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import { useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {};

  const onSaveImageAsync = async () => {};

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("No Image Selected");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-all"
              label="save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Chooose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },

  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },

  optionsContainer: {
    position: "center",
    flexDirection: "row",
  },

  optionRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
