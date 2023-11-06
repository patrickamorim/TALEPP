import React, {useState, useEffect,useFocusEffect}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import {getTurmas} from '../../services/Turmas';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {verRespostas} from '../../services/verRespostas';
import { DownloadAudio } from '../../services/DownloadAudio';

import moment from '../../Assets/moment';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../Styles/Colors';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';

import {cleanUserAuth as sair} from '../../services/Auth';

const CorrigirAtividades = ({navigation}) => {

  const [turmas, setTurmas] = useState();
  const Navigation = useNavigation();
  const [audioPath, setAudioPath] = useState(AudioUtils.DocumentDirectoryPath + '/test.aac');
  const [urlAudio, setUrlAudio] = useState("");
  const deslogar = () => {
    sair();
    navigation.goBack();

  }

  const signOut =  () => {
    
    deslogar();   
    
  }

  const testeDown = async () => {
   const url = await verRespostas();
   setUrlAudio(url);
  }

  const baixarAudio = async () => {
   const tempPath = await DownloadAudio(urlAudio, AudioUtils.DocumentDirectoryPath);
   setAudioPath(tempPath);

  }

  const _play = async() => {
 
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
            console.log('successfully finished playing DA PASTA '+audioPath);
            console.log('url do audio:'+urlAudio);
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  };

  useEffect(()=> {

      const loadTurmas = async () => Navigation.addListener('focus', async () => {
     
      });  

    loadTurmas();
    

  }, []);


    return (
        <View style={styles.container}>
           
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Respostas Baixadas</Text>
           
            </View>

            <View style={[styles.corpo]}> 
               
            <TouchableOpacity 
                style={styles.botaoCabecalho}
                onPress={() => _play()}
                >
                    <Text style={styles.textoBotaoCabecalho}>P</Text>
                </TouchableOpacity>
                
            <TouchableOpacity 
                style={styles.botaoCabecalho}
                onPress={() => testeDown()}
                >
                    <Text style={styles.textoBotaoCabecalho}>Link</Text>
                </TouchableOpacity>
           
            <TouchableOpacity 
                style={styles.botaoCabecalho}
                onPress={() => baixarAudio()}
                >
                    <Text style={styles.textoBotaoCabecalho}>Down</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.rodape}>
              <TouchableOpacity>
                <Icon2 style={styles.iconeRodape} name="account-circle"/> 
              </TouchableOpacity>  
              <TouchableOpacity
              onPress={() => console.log(turmas)}
              >
                <Icon2 style={[styles.iconeRodape, {color: 'blue'}]} name="podium" /> 
              </TouchableOpacity>  
              <TouchableOpacity>
                <Icon3 style={[styles.iconeRodape]} name="user-graduate" /> 
              </TouchableOpacity>  
              <TouchableOpacity
              onPress={() => signOut()}
              >
                <Icon2 style={[styles.iconeRodape, {color: Colors.voltar}]} name="logout" /> 
              </TouchableOpacity>  
      
            </View>

        </View>
    )
}

export default CorrigirAtividades

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Fundo,
        //justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: 270,
        height: 70,
        marginBottom: 8,
        borderRadius: 5,
        paddingLeft: 6
    },
    cardParteUm: {
      flex: 1
    },
    cardParteDois: {
     // backgroundColor: 'cyan',  
      borderRadius: 5,
      justifyContent: 'center'
    },
    CardIcone: {
      fontSize: 25,
      alignSelf: 'center',
      paddingHorizontal: 6,
      
    },
    linhaCard: {
      backgroundColor: 'black',
      width: 2,
      height: 50,
      alignSelf:'center',
      marginRight: 3
    },
    corpo: {
        flex: 0.77,
        marginTop: 40,
        //backgroundColor: 'blue',
        width: "80%",
        alignItems: 'center',
       //justifyContent: 'center',
        alignSelf: 'center'
        
    },
    titulo: {
        color: Colors.botaoEscuro,
        //flex: 1,
        fontSize: 30,
        //marginBottom: ,
        textAlign: 'center',
        fontWeight: 'bold',
    },
   
    textoBotao: {
        color: Colors.textoBranco,
        fontSize: 22
    },
    textoBotaoCabecalho: {
        alignSelf: 'center',
       
        color: Colors.textoBranco,
        fontSize: 35,
      
    },
    textInput: {
        backgroundColor: 'white',
        width: '80%',
        height: 35,
        borderRadius: 2,
        borderWidth: 1,
        alignSelf: 'center',
       // fontSize: 15,
        
    },
    textoGeral: {
        color: 'black', 
        
        textAlign: 'center'
    },
    botaoCabecalho: {
      //  position: 'relative',
        backgroundColor: Colors.botaoAdicinoar,
        width: 100,
        height: 50,
        borderRadius: 50,     
        alignSelf: 'center',
       // justifyContent: 'center',
        marginBottom: 3,
        marginLeft: 0,
        borderColor: 'black',
        borderWidth: 1
    },
    cabecalho: {
        justifyContent: 'center',
        backgroundColor: Colors.FundoClaro,
        flexDirection: 'row',
   
        paddingTop: 70
    },
    rodape: {
        marginBottom: -50,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Fundo,
        flexDirection: 'row',
    },
    iconeRodape: {
        marginHorizontal: 10,
        fontSize: 50
    },
   
})


