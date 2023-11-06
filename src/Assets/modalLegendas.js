import React, {useState} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import Colors from '../Styles/Colors';

const ModalLegendas = ({}) => {

    const [modalVisible, setModalVisible] = useState(false);

   
    
    const legendas = () => {

        return(
           "LEGENDA DOS PADRÕES: /b"+
           "SDSD"
          
        )
    }
    
    return (
        <KeyboardAvoidingView behavior="position">

            <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                <Icon2 style={[styles.iconeRodape, {color: Colors.botaoEscuro}]} name="map-legend"/> 
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
           
            <View style={styles.textInput}>  
                <Text style={{alignSelf: 'center', fontSize: 16}}>Legendas dos Padrões Silábicos</Text>
                <Text></Text>
                <Text>CV:</Text>
                <Text>Consoante-Vogal</Text>
                <Text style={{fontSize: 1}}></Text>
                <Text>VC:</Text>
                <Text>Vogal-Consoante</Text>
                <Text style={{fontSize: 1}}></Text>
                <Text>CCV:</Text>
                <Text>Consoante-Consoante-Vogal</Text>
                <Text style={{fontSize: 1}}></Text>
                <Text>CVV:</Text>
                <Text>Consoante-Vogal-Vogal</Text>
                <Text style={{fontSize: 1}}></Text>
                <Text>CVC:</Text>
                <Text>Consoante-Vogal-Consoante</Text>
                <Text style={{fontSize: 1}}></Text>
                <Text>CCVC:</Text>
                <Text>Consoante-Consoante-Vogal-Consoante</Text>
                <Text style={{fontSize: 1}}></Text>
                <Text>CVVC:</Text>
                <Text>Consoante-Vogal-Vogal-Consoante</Text>
                <Text style={{fontSize: 1}}></Text>
                 
                
                <View style={styles.rodape}>

                    <TouchableOpacity
                    onPress={()  => setModalVisible(!modalVisible)}
                    >
                    <Icon2 style={[styles.iconeRodape, {color: 'green', fontSize: 30, marginTop: 10}]} name="map-check-outline"/> 
                    
                    </TouchableOpacity>  

                </View>

            </View>
          
    
          
          
  
        </View>
      </Modal>

        </KeyboardAvoidingView>
    )
}

export default ModalLegendas

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
       // flex: 0.75,
      // width: -150,
       height: '67%',
       alignSelf:'center',
       justifyContent: "center",
        alignItems: "center",
        marginTop: 130
      },
    
    label: {
        color: 'black',
        fontSize: 22,
        width: '100%',
        alignSelf: 'center', 
       // marginBottom: 10,
        marginTop: -10
    },  
    textInput: {
        flex: 0.79,
        backgroundColor: 'white',
        width: '85%',
        // height: "85%",
        borderRadius: 5,
        borderWidth: 1,
       // alignSelf: 'flex-start',
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
       // marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: Colors.Fundo,
       // flexDirection: 'row',
    },
    iconeRodape: {
        marginHorizontal: 10,
        fontSize: 52
    },
})
