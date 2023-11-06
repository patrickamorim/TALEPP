import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TouchableHighlight, Alert, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Colors from '../Styles/Colors';
import Gravacao from '../Assets/gravacao';
import moment from '../Assets/moment';
import {ResponderAtividade, SalvarAtividade} from '../services/ResponderAtividade';

const ResponderModal = ({jaRespondeu, stopSpeech, atividade, salvarAudio, setTempoInicio, aluno, arrayPalavras, caminhoAudio, palavraAtual, proximaPalavra, anteriorPalavra, indexPalavras, indexPalavrasAtual, aparecerIndex, setAparecerIndex}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [palavra, setPalavra] = useState();
    const [color, setColor] = useState(Colors.voltar);
    const [disabledProximo, setDisabledProximo] = useState({disabled : true, color: 'grey'});
    const [showTheThing, setShowTheThing] = useState(false);
    const [enviandoAtividade, setEnviandoAtividade] = useState('Enviar Atividade');
   
    const fecharModal = () => {
        if(indexPalavras == indexPalavrasAtual+1) setModalVisible(false)
    }

    return (
        <KeyboardAvoidingView behavior="position">
            
       
           
        <TouchableOpacity 
                style={styles.botaoCabecalho}
                onPress={() => (setModalVisible(true),
                    console.log('saas', caminhoAudio),
                    setAparecerIndex(true),
                    setTempoInicio(new Date()),
                    stopSpeech()
                    // setContRespostas(1)
                    )}
                >
                      <Icon2 style={[styles.play]} name="play" /> 
        </TouchableOpacity>

      
        {jaRespondeu && (<TouchableOpacity 
                style={[styles.botaoEnviarAtividade, {backgroundColor: color}]}
               
                onPress={() => (salvarAudio())}
                >
                      <Text  style={[styles.textoBotao]}>{enviandoAtividade}</Text>
        </TouchableOpacity>)}
               

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={styles.centeredView}>
        
            <View style={[styles.modalView]}>
            
            
                <Text style={styles.label}>Leitura de Palavras:</Text>
                <Text style={styles.label}>Palavra {indexPalavrasAtual+1}/{indexPalavras}:</Text>

            
            <View style={[{ height: '60%', justifyContent: 'center', marginTop: 20, marginBottom: -10}]}>
                
                <TouchableOpacity style={[{justifyContent: 'center'}]}>
                <Text style={styles.labelCenter}>{aparecerIndex && arrayPalavras[indexPalavrasAtual]}</Text>
                </TouchableOpacity>
                

            </View>
            
       
            <View style={[styles.rodape, {backgroundColor: 'white',height: '25%' }]}>

                    <TouchableOpacity 
                    style={[styles.botaoAtualizar,{ marginRight: 10, marginBottom: -20}]}
                onPress={() => (anteriorPalavra(), setShowTheThing(true))}
                >
                    <Text style={styles.textoBotao}>Anterior</Text>
                </TouchableOpacity>  


             <Gravacao caminhoAudio = {caminhoAudio} palavraAtual = {palavraAtual} setDisabledProximo= {setDisabledProximo} setShowTheThing= {setShowTheThing} showTheThing = {showTheThing}/>

                   
                <TouchableOpacity 
                    disabled={disabledProximo.disabled}
                    style={[styles.botaoAtualizar,{ marginLeft: 10, marginBottom: -20, backgroundColor: disabledProximo.color}]}
                onPress={() => (proximaPalavra(), setDisabledProximo({disabled: true, color: 'grey'}), fecharModal(), setShowTheThing(false))}
                >
                    <Text style={styles.textoBotao}>Próxima</Text>
                </TouchableOpacity>  
                
              
    
            </View>
  
             
        </View>
        </View>
        
      </Modal>

        </KeyboardAvoidingView>
    )
}

export default ResponderModal

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.BotaoClaro,
        width: 59,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 2,
        borderWidth: 1,
    },
    centeredView: {
       // flex: 0.8,
       height: '80%',
       //width: "100%",
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22
      },
      modalView: {
        marginBottom: 0,
        marginTop: 30,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'blue',
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: "center",
    }, 
    label: {
        color: 'black',
        fontSize: 22,
        width: '100%',
        alignSelf: 'center', 
        marginBottom: 10,
        marginTop: -10
    },
    labelCenter: {
        color: 'black',
        fontSize: 40,
        width: '100%',
        alignSelf: 'center', 
        marginBottom: 10,
        marginTop: -10,
        fontWeight: 'bold'
    },  
    textInput: {
        backgroundColor: 'white',
        width: '85%',
        height: "100%",
        borderRadius: 3,
        borderWidth: 1,
        alignSelf: 'flex-start',
        fontSize: 16,
        textAlignVertical: 'top',
        
    },
    flatList: {
        marginTop: 25
    },
    itensDaLista: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        marginVertical: 5,
    },
    textoLista: {
        fontSize: 20,
        //margin: 2
    },
    botaoConfirmar: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 120,
        height: 35,
        borderWidth: 1,
    },
    botaoAtualizar: {
        backgroundColor: Colors.BotaoConfirmar,
        justifyContent: 'center',
        alignItems: 'center',
       // marginHorizontal: 5,
        width: 80,
        height: 25,
        borderWidth: 1,
        
    },botaoEnviarAtividade: {
        backgroundColor: Colors.voltar,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:0,
        marginTop: 10,
        width: 130,
        height: 30,
        borderWidth: 1,
        
    },
    textoBotao: {
        color: Colors.textoBranco,
        fontSize: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    rodape: {
      //  marginBottom: -50,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: Colors.Fundo,
        flexDirection: 'row',
    },
    iconeRodape: {
        marginHorizontal: 10,
        fontSize: 45
    },
    play: {
      //  marginHorizontal: 10,
        fontSize: 35,
       // justifyContent: 'center',
       alignSelf: 'center'
    }, botaoCabecalho: {
        //  position: 'relative',
          backgroundColor: 'green',
          width: 50,
          height: 50,
          borderRadius: 50,     
          alignSelf: 'center',
          justifyContent: 'center',
        //   marginBottom: -12,
         // marginLeft: 12,
          borderColor: 'black',
          borderWidth: 1
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
          borderWidth: 3,
         
          alignContent: 'center',
      }
})
