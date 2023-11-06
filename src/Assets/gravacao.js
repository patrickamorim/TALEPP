import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, TouchableOpacity  } from 'react-native'
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';
import {ResponderAtividade, SalvarAtividade} from '../services/ResponderAtividade';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Styles/Colors';

const Gravacao = ({MostrarGravacao, play, caminhoAudio, palavraAtual, setDisabledProximo, showTheThing, setShowTheThing}) => {

const [currentTime, setCurrentTime] = useState(0);
const [recording, setRecording] = useState(false);
const [paused, setPaused] = useState(false);
const [stoppedRecording, setStoppedRecording] = useState(false);
const [finished, setFinished] = useState(false);
const [audioPath, setAudioPath] = useState(AudioUtils.DocumentDirectoryPath +'/'+caminhoAudio+'/');
const [hasPermission, setHasPermission] = useState(undefined);
const [text, setText] = useState('test');
const [audioDownload, setAudioDownload] = useState();
const [recordingColor, setRecordingColor] = useState('red');


useEffect(() => {

  setAudioPath(AudioUtils.DocumentDirectoryPath +'/'+caminhoAudio+'/');
  AudioRecorder.requestAuthorization().then((isAuthorised) => {
    setHasPermission(isAuthorised);

    if (!isAuthorised) return;

    prepareRecordingPath(audioPath+palavraAtual+'.aac');

    AudioRecorder.onProgress = (data) => {
      setCurrentTime(Math.floor(data.currentTime));
    };

    AudioRecorder.onFinished = (data) => {
      // Android callback comes in the form of a promise instead.
      if (Platform.OS === 'ios') {
        _finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
      }
    };

  });

},[]);

// const play = () => {
//   _play();
// }

const onChangeText = (value) => {
  setText(value);
  setAudioPath(AudioUtils.DocumentDirectoryPath + '/'+value+'.aac')
};

const prepareRecordingPath = () => {
  AudioRecorder.prepareRecordingAtPath(audioPath+palavraAtual+'.aac', {
    SampleRate: 22050,
    Channels: 2,
    AudioQuality: "High",
    AudioEncoding: "aac",
    AudioEncodingBitRate: 32000
  });
};

const _renderButton = (title, onPress, active) => {
  var style = (active) ? styles.activeButtonText : styles.buttonText;

  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={style}>
        {title}
      </Text>
    </TouchableHighlight>
  );
}

const _recordFunction = () => {
  if(recording){
  _stop();
  }
  if(!recording)
  _record();
}

const _renderPauseButton = (onPress, active) => {
  var style = (active) ? styles.activeButtonText : styles.buttonText;
  var title = paused ? "RESUME" : "PAUSE";
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={style}>
        {title}
      </Text>
    </TouchableHighlight>
  );
}

const _pause = async () => {
  if (!recording) {
    console.warn('Can\'t pause, not recording!');
    return;
  }

  try {
    const filePath = await AudioRecorder.pauseRecording();
    setPaused(true);
  } catch (error) {
    console.error(error);
  }
};

const  _resume = async () => {
  if (!paused) {
    console.warn('Can\'t resume, not paused!');
    return;
  }

  try {
    await AudioRecorder.resumeRecording();
    setPaused(false);
  } catch (error) {
    console.error(error);
  }
};

const _stop = async () => {
  if (!recording) {
    console.warn('Can\'t stop, not recording!');
    return;
  }

  setStoppedRecording(true); setRecording(false); setPaused(false);

  try {
    const filePath = await AudioRecorder.stopRecording();

    if (Platform.OS === 'android') {
      _finishRecording(true, filePath);
    }
    console.log("texto : "+text);
    return filePath;
  } catch (error) {
    console.error(error);
  }
};

const _play = async() => {

 // ResponderAtividade(audioPath ,caminhoAudio+'/'+palavraAtual+'.aac');  //aqui faz o upload
  if (recording) {
    await _stop();
  }

  // These timeouts are a hacky workaround for some issues with react-native-sound.
  // See https://github.com/zmxv/react-native-sound/issues/89.
  setTimeout(() => {
    var sound = new Sound(audioPath+palavraAtual+'.aac', '', (error) => {
      if (error) {
        console.log('failed to load the sound', error, audioPath+palavraAtual+'.aac');
      }
    });

    setTimeout(() => {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing in:' +audioPath+palavraAtual+'.aac');
        } else {
          console.log('playback failed due to audio decoding errors');
        }

        sound.release();
      });
    }, 100);
  }, 100);
};

const _record= async() => {
  if (recording) {
    console.warn('Already recording!');
    
    return;
  }

  if (!hasPermission) {
    console.warn('Can\'t record, no permission granted!');
    return;
  }

  if(stoppedRecording){
    prepareRecordingPath(audioPath+palavraAtual+'.aac');
    
  }
  setRecordingColor('green');
  setShowTheThing(false);
  setRecording(true); setPaused(false);

  try {
    const filePath = await AudioRecorder.startRecording();
  } catch (error) {
    console.error(error);
  }
};

const salvarAudio = async () => {

  const downloadCompleto = await ResponderAtividade(audioPath+palavraAtual+'.aac');
  
  

}

const _finishRecording = (didSucceed, filePath, fileSize) => {
  setRecordingColor('red');
  
  setFinished(didSucceed);
  console.log(`Finished recording of duration ${currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
  setShowTheThing(true);
}


  return (
    <View >
          <View style={[styles.botaoGravado, {marginBottom: 10}]}>
          {showTheThing &&
              <TouchableOpacity 
              style={styles.AreabotaoGravado}
              onPress={() => (_play())}
              >
                  <Text style={[styles.textoBotao]}>Gravado</Text>
                  <Icon style={[ {color: 'black', fontSize: 20}]} name="play-arrow"/> 
              </TouchableOpacity>  
          }  
          </View>

         <TouchableOpacity
                style={[styles.botaoGravar, {backgroundColor: recordingColor, alignSelf:'center'}]}
                onPress={()  => {_recordFunction(), setDisabledProximo({disabled: false, color: Colors.BotaoConfirmar})}}
                >
                <Icon style={[styles.iconeRodape, {color: 'cyan'}]} name="keyboard-voice"/> 
          </TouchableOpacity>  

      {/* <Text>aa</Text> */}
     {/* <View style={styles.container}> */}
    {/* <View style={styles.controls}> */}
      {/* {_renderButton("RECORD", () => {_record()}, recording )} */}
      {/* {_renderButton("PLAY", () => {_play()} )}
      {_renderButton("STOP", () => {_stop()} )}
      {_renderPauseButton(() => {paused ? _resume() : _pause()})}
      {_renderButton("SALVAR AUDIO", () => {salvarAudio()} )}
      <Text style={styles.progressText}>{currentTime}s</Text>
    </View>
    <View>
      <TextInput style={styles.input}
       onChangeText={onChangeText}
       value={text}
      ></TextInput> 
    </View> */}
  </View>
  )
}

export default Gravacao

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2b608a",
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    progressText: {
      paddingTop: 50,
      fontSize: 50,
      color: "#fff"
    },
    button: {
      padding: 20
    },
    disabledButtonText: {
      color: '#eee'
    },
    buttonText: {
      fontSize: 20,
      color: "#fff"
    },
    activeButtonText: {
      fontSize: 20,
      color: "#B81F00"
    },
    input : {
      backgroundColor: 'white'
    }, botaoGravar: {
      //  position: 'relative',
        //backgroundColor: 'red',
        width: 70,
        height: 70,
        borderRadius: 50,     
        alignSelf: 'center',
        justifyContent: 'center',
      //   marginBottom: -12,
       // marginLeft: 12,
        borderColor: 'grey',
        borderWidth: 4,
       
        alignContent: 'center',
    },
    iconeRodape: {
        marginHorizontal: 10,
        fontSize: 45
    }, botaoGravado: {
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        // marginHorizontal: 5,
          width: 80,
          height: 25,
         // borderWidth: 1,
          paddingTop: -20
      
  },
     AreabotaoGravado: {
          backgroundColor: Colors.BotaoClaro,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        // marginHorizontal: 5,
          width: 85,
          height: 25,
          borderWidth: 1,
          borderRadius: 15,
          flexDirection: 'row'
  },textoBotao: {
    color: 'black',
    fontSize: 14,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
},
  });

