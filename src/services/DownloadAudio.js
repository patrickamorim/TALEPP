import RNFetchBlob from "rn-fetch-blob";
import storage from '@react-native-firebase/storage';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export const DownloadAudio = async (link, referenciaArquivo, pathAudio) => {

 // console.log('arquivooooooo :', pathAudio+'/'+referenciaArquivo);
 //let nomeArquivo = "/testeaudioNovapastaI.aac";  
 let link1 = link;
  //  let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path: pathAudio+'/'+referenciaArquivo,
    })
      .fetch("GET",link1 , {
        //some headers ..
      })
      .then((res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
      //  console.log("The file saved to ", res.path());
        _play(referenciaArquivo);
      });


      //return  pathAudio+nomeArquivo;
}

export const verRespostas = async  (referenciaArquivo, pathAudio) => {

  const url = await storage().ref(referenciaArquivo).getDownloadURL();
  console.log("url do down", url)

  DownloadAudio(url, referenciaArquivo,  pathAudio);
 // return url;
//Alert.alert("função :", reference.toString());
}

const _play = async (diretorioArquivo) => {


  setTimeout(() => {

    var sound = new Sound(AudioUtils.DocumentDirectoryPath + "/"+diretorioArquivo, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error, diretorioArquivo);
      
      }
    });

    setTimeout(() => {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing in:' +diretorioArquivo);
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 100);
  }, 100);
};