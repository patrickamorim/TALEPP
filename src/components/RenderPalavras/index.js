import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'

import Colors from '../../Styles/Colors';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNPickerSelect from 'react-native-picker-select';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { DownloadAudio,verRespostas } from '../../services/DownloadAudio';

export default function RenderPalavras({respostas, salvarCorrecao}) {
 
 const [palavras, setPalavras] = useState(respostas.palavras)
 const [textoSalvar, setTextoSalvar] = useState(respostas.corrigido ? 'Atualizar Correção' : 'Salvar Correção')
 const [corBotao, setCorBotao] = useState(respostas.corrigido ? Colors.botaoAdicinoar : Colors.help)
 const [resposta, setResposta] = useState(respostas)
 const [corSom, setCorSom] = useState('green');
 const [toggleCheckBox, setToggleCheckBox] = useState(false)
 
 const [selectedLanguage, setSelectedLanguage] = useState();

const oncheked = async (diretorio) => {

  let novaPalavras;
  novaPalavras = await palavras.map((palavras, index) => {
    if(palavras.resposta.diretorio == diretorio)
    palavras.resposta.correcao = !palavras.resposta.correcao;

    return palavras;
  })

  setPalavras(novaPalavras);
  //palavrasCorrigidas(novaPalavras);
  console.log(palavras);
};

 const _play = async (diretorioArquivo) => {


   setTimeout(() => {

     var sound = new Sound(AudioUtils.DocumentDirectoryPath + "/"+diretorioArquivo, '', (error) => {
       if (error) {
         console.log('failed to load the sound', error, diretorioArquivo);
        
         console.log('errrrorrrr', error)
       }
     });
 
     setTimeout(() => {
       sound.play((success) => {
         if (success) {
           console.log('successfully finished playing in:' +diretorioArquivo);
         } else {
           console.log('playback failed due to audio decoding errors');
           verRespostas(diretorioArquivo, AudioUtils.DocumentDirectoryPath);
         }

         sound.release();
       });
     }, 100);
   }, 100);
 };


    return (
    <View >

         {palavras.map((palavras, index) => {
          // {console.log(resposta)}
            return (
              
              <View key={palavras.resposta.diretorio} style={styles.cardPT2}>

                <Text style={styles.palavra}>{palavras.resposta.palavra}</Text>
              

                <View style={styles.linhaCard}></View>

                {/* <Text style={styles.audio}>{palavras.resposta.palavra}</Text> */}
                <TouchableOpacity style={styles.audio}
                  onPress={() => _play(palavras.resposta.diretorio)}
                >
                   <Icon2  style={[styles.audioIcon, {color: corSom}]} name="volume-medium" /> 
                </TouchableOpacity>
                
                <View style={styles.linhaCard}></View>

                {/* <Text style={styles.acao}>{palavras.resposta.palavra}</Text> */}
                <View style={styles.acao}>
                <CheckBox
                      disabled={false}
                      value={palavras.resposta.correcao}
                      onValueChange={(newValue) => oncheked(palavras.resposta.diretorio)}
                    />
                </View>
              </View>

            )
         })}

         <View>
         <TouchableOpacity style={[styles.botaoEnviarAtividade, {backgroundColor: corBotao}]}
         onPress={() => salvarCorrecao(palavras, respostas)}
         >
            <Text style={styles.textoBotao}>{textoSalvar}</Text>
          </TouchableOpacity>
         </View>
         
         
    </View>
  )
}

const styles = StyleSheet.create({
 
  cardPT2: {
    
      backgroundColor: 'white',
      flexDirection: 'row',
      alignSelf: 'center',
     // width: 270,
      //height: 25,
    //  marginBottom: 8,
   //   marginTop: -6,
     // borderRadius: 5,
      paddingLeft: 10
  },
  linhaCard: {
    backgroundColor: 'grey',
    width: 2,
    height: 15,
    alignSelf:'center',
    marginRight: 3,
    opacity: 0.5
  }, 
  palavra: {
    width: '34%',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  audio: {
    width: '30%',
    alignItems: 'center',
    //fontSize: 25
  },
  audioIcon: {
    color: 'grey',
    fontSize: 25
  },
  acao: {
    width: '30%',
    alignItems: 'center'
  }, 
  textInput: {
     width: '30.3%',
   alignItems: 'center',
    backgroundColor: 'white',
   // width: '80%',
    height: 35,
    borderRadius: 3,
    borderWidth: 1,
    alignSelf: 'center',
    fontSize: 15,
},
botaoEnviarAtividade: {
  backgroundColor: Colors.voltar,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
 // marginHorizontal:0,
  marginVertical: 5,
  width: "100%",
  height: 25,
  borderWidth: 1,
  
},
textoBotao: {
  color: Colors.textoBranco,
  fontSize: 15,
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center'
},
})