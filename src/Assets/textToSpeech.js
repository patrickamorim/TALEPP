import * as React from 'react';

import Tts from 'react-native-tts';

export default function speech(entradaDoTexto) {

  // Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
  console.log("falando ...", entradaDoTexto)

  Tts.setIgnoreSilentSwitch("ignore");
  Tts.setDefaultPitch(1);
  Tts.setDefaultLanguage('PT-BR');
  Tts.setDefaultRate(0.5)

  Tts.getInitStatus().then(() => { Tts.speak(entradaDoTexto, {
  androidParams: {
    KEY_PARAM_PAN: 0,
    KEY_PARAM_VOLUME: 1,
    KEY_PARAM_STREAM: 'STREAM_MUSIC',
   
  },
});
  
});
}

export function stopSpeech(){
  Tts.stop(true);
}