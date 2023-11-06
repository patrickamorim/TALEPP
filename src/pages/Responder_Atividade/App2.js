import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput  } from 'react-native'
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';
import {ResponderAtividade} from '../../services/ResponderAtividade';

export default function AppFunction() {

const [currentTime, setCurrentTime] = useState(0);
const [recording, setRecording] = useState(false);
const [paused, setPaused] = useState(false);
const [stoppedRecording, setStoppedRecording] = useState(false);
const [finished, setFinished] = useState(false);
const [audioPath, setAudioPath] = useState(AudioUtils.DocumentDirectoryPath + '/test.aac');
const [hasPermission, setHasPermission] = useState(undefined);
const [text, setText] = useState('test');
const [audioDownload, setAudioDownload] = useState();


useEffect(() => {

  AudioRecorder.requestAuthorization().then((isAuthorised) => {
    setHasPermission(isAuthorised);

    if (!isAuthorised) return;

    prepareRecordingPath(audioPath);

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

const onChangeText = (value) => {
  setText(value);
  setAudioPath(AudioUtils.DocumentDirectoryPath + '/'+value+'.aac')
};

const prepareRecordingPath = () => {
  AudioRecorder.prepareRecordingAtPath(audioPath, {
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: "Low",
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
  if (recording) {
    await _stop();
  }

  // These timeouts are a hacky workaround for some issues with react-native-sound.
  // See https://github.com/zmxv/react-native-sound/issues/89.
  setTimeout(() => {
    var sound = new Sound(audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });

    setTimeout(() => {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
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
    prepareRecordingPath(audioPath);
  }

  setRecording(true); setPaused(false);

  try {
    const filePath = await AudioRecorder.startRecording();
  } catch (error) {
    console.error(error);
  }
};

const salvarAudio = async () => {

  const downloadCompleto = await ResponderAtividade(audioPath);
  
  

}

const _finishRecording = (didSucceed, filePath, fileSize) => {
  setFinished(didSucceed);
  console.log(`Finished recording of duration ${currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
}


  return (
    <View style={styles.container}>
    <View style={styles.controls}>
      {_renderButton("RECORD", () => {_record()}, recording )}
      {_renderButton("PLAY", () => {_play()} )}
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
    </View>
  </View>
  )
}

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
    }

  });

