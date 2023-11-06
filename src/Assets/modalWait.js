import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TouchableHighlight, Alert, KeyboardAvoidingView,Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome';
import Colors from '../Styles/Colors';

const ModalWait = ({modalVisible,setModalVisible}) => {

   // const [modalVisible, setModalVisible] = useState(false);
   const [animacao, setAnimacao] = useState(new Animated.Value(1));
  // const [animacao, setAnimacao] = useState(80);
   
useEffect(() => {
console.log('<<>>>', animacao)
},[])



Animated.loop(
    Animated.timing(animacao, {
        toValue: 1.4,
        duration: 5000,
        useNativeDriver: true,
      })).start();

   
   return (
        <KeyboardAvoidingView behavior="position" >
            
       
        <Modal
       
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(false);
        }}
      >
        
        <View style={styles.centeredView}>
        
            <View style={styles.background}></View>

            <View style={[styles.modalView]}>
           
            <Text style={{fontSize: 30}}>Aguarde !!!</Text>
            
            <Text></Text>
            <Text style={{textAlign: 'justify', fontSize: 20, paddingHorizontal: 10}}>A resposta está sendo enviada para o professor, não saia desta tela !</Text>
              
             <Animated.View style={{scaleX: animacao, scaleY: animacao}}>
                <Icon3 style={styles.play} name="cloud-upload" /> 
             </Animated.View> 
           
             
        </View>
        <View style={styles.background}></View>
        </View>
        
      </Modal>

        </KeyboardAvoidingView>
    )
}

export default ModalWait

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
    background: {
    backgroundColor: Colors.Fundo, 
    width: '100%', 
    height: '100%', 
    opacity: 0.7, 
    },
    centeredView: {
        flex: 1,
      // height: '80%',
       width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        alignContent: 'center',
        //backgroundColor: 'red',
       
        //marginTop: 22
      },
      modalView: {
        width: "80%",
        opacity: 1,
      //  marginBottom: 0,
       // marginTop: 30,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'blue',
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: "center",
        textAlignVertical:'center'
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
    instrucoes: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.botaoEscuro,
        width: 270,
        height: '65%',
        marginBottom:15,
        alignItems: 'center',
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
        color: 'blue',
        marginTop: 20,
        fontSize: 80,
       // justifyContent: 'center',
       alignSelf: 'center',
      
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
