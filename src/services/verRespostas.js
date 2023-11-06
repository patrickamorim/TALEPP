
import storage from '@react-native-firebase/storage';

export const verRespostas = async  (RespostaDown) => {

    const url = await storage().ref('teste.aac').getDownloadURL();
    console.log("url do down", url)
  
    return url;
//Alert.alert("função :", reference.toString());
}