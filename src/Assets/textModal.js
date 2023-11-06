import React, {useState} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Colors from '../Styles/Colors';

const TextModal = ({itensPesquisados, onChange, disable, setAtividadeOk, modeloDoTeste, mostrar}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [frase, setFrase] = useState('');
 //   const [testeModelo, setTesteModelo] = useState(modeloDoTeste);
   
    
    const resumoModeloTeste = () => {

        

        return(
           "VERSÃOD O TESTE: "+
            JSON.stringify(modeloDoTeste.Versao_teste)+
            JSON.stringify(modeloDoTeste.palavras)
       
        )
    }
    
    
    const setTexto = (item) => {
        
       
        setFrase(item);
        setAtividadeOk(false);
        //
    }
  

    const isValid = () => {
        if (frase !== "") {
          return true;
        }
    }

    const guardarFrase = () => {

       // if(isValid()){
            onChange(modeloDoTeste);
            setAtividadeOk(true);
            Alert.alert("Modelo Confirmado!");
            setModalVisible(false);
        //}else{
           // Alert.alert("Atenção Professor !", "A atividade deve conter pelo menos uma frase completa !!!")
      //  }
          
        
    }

    return (
        <KeyboardAvoidingView behavior="position">
            
       

        <TouchableOpacity disabled={mostrar}
                style={styles.botaoConfirmar}
                onPress={() => {setModalVisible(true)}}
                >
                    <Text style={styles.textoBotao}>Selecionar</Text>
        </TouchableOpacity>


        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}
      >
            <View style={styles.centeredView}>
           <View style={styles.modalView}>
            
        
           <Text style={styles.label}>Confirmar Teste:</Text>
           <View style={[{flexDirection: 'row',backgroundColor:'red' , height: '80%'}]}>
            <TextInput
                style={styles.textInput}
                value={resumoModeloTeste()}
                autoCompleteType="off"
                keyboardType="web-search"
                editable={false}
                multiline={true}
                numberOfLines={20} 
                onChangeText={(text) => {
              
                }}

            />
            </View>
          
            <View style={styles.rodape}>

            <TouchableOpacity 
            style={styles.botaoAtualizar}
          onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textoBotao}>Atualizar v1.2</Text>
          </TouchableOpacity>  

          <TouchableOpacity
          
          onPress={()  => guardarFrase()}
          >
            <Icon style={[styles.iconeRodape, {color: 'green'}]} name="check"/> 
            
          </TouchableOpacity>  
        
         
  
        </View>
  
             
        </View>
        </View>
      </Modal>

        </KeyboardAvoidingView>
    )
}

export default TextModal

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
       //height: '80%',
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22
      },
      modalView: {
        marginBottom: 0,
        marginTop: 30,
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'grey',
        padding: 20,
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
        backgroundColor: Colors.voltar,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 140,
        height: 35,
        borderWidth: 1,
    },
    textoBotao: {
        color: Colors.textoBranco,
        fontSize: 22
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
})
