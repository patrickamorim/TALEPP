import React, {useState, useEffect}  from 'react'
import { StyleSheet,ScrollView, Text, View, TextInput, TouchableOpacity,KeyboardAvoidingView, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';

import {getTesteTemp} from '../../services/Testes'
import Colors from '../../Styles/Colors';
import NewEntryDatePicker from '../../Assets/dateSelect';
import moment from '../../Assets/moment';
import TextModal from '../../Assets/textModal';
import {RFValue} from 'react-native-responsive-fontsize'

const CriarAtividade = ({setTitulo, titulo, dataInput, TesteTemp, setdataInput, delimitador, setModelo, setAtividade, setAtividadeOk}) => {
    const [nascimento, setNascimento] = useState(dataInput);
  
    const [modeloTemp, setModeloTemp] = useState("Selecione o modelo do teste");
    const [modeloConfirmar, setModeloConfirmar] = useState('');
    const [campodata, setCampoData] = useState(moment(nascimento).format('LL'));
    const [dataEntrega, setDataEntrega] = useState(new Date());
    const [mostrarSelecionar, setMostrarSelecionar] = useState(true);


const setNascimentoo = (valor) => {
    setNascimento(valor);
    setdataInput(valor);
    setCampoData(moment(valor).format('LL'));
   
}



   // const [atividade, setAtividade] = useState();
    
    const [responsavel, setResponsavel] = useState('');
    const [status, setStatus] = useState('');
  
    const [id_turma, setId_Turma] = useState();


    return(
   

    <KeyboardAvoidingView behavior="height"   style={[styles.corpoComponent]}> 

    <Text style={styles.label}>Título da Atividade: <Text style={{color: 'red'}}>*</Text></Text>
        <TextInput
            style={styles.textInput}
            maxLength={24}
            value={titulo}
            autoCompleteType="email"
            keyboardType="web-search"
            onChangeText={(text) => {
                setTitulo(text);
            }}
        />

                


        <Text style={styles.label}>Data de Entrega: <Text style={{color: 'red'}}>*</Text></Text>   
        <View style={{flexDirection: 'row', alignSelf: 'center', width: "80%"}}>
            
            <TextInput
                style={[styles.textInput, {width: '80%'}]}
                value={campodata}
                editable={false}
                autoCompleteType="email"
                keyboardType="default"
                onChangeText={(text) => {
                    setNascimento(text);
                    
                }}
            />
            <NewEntryDatePicker value={nascimento} onChange={setNascimentoo}/>
        </View>


            <Text style={styles.label}>Modelo de Teste:</Text>
         
            <View style={styles.selectpicker} >
                <Picker

                
                selectedValue={modeloTemp}
                onValueChange={(itemValue, itemIndex) =>{
                    setModelo(itemValue)
                    setModeloTemp(itemValue)
                    setMostrarSelecionar(false)
                    TesteTemp(getTesteTemp(itemValue));
                    setModeloConfirmar(getTesteTemp(itemValue));
                }}>
                <Picker.Item label="Selecione um modelo" value="" />
                <Picker.Item label="Leitura de Palavras" value="Leitura_P" />
                <Picker.Item label="Leitura de Pseudo-Palavras" value="Leitura_PP" />
                
                </Picker>
            </View>  


            <Text style={[styles.label, styles.labelSalvar]}>Selecionar Teste</Text>
            
         
        
        <View style={styles.cardButtons}>

            <TextModal onChange={setAtividade} setAtividadeOk={setAtividadeOk} modeloDoTeste={modeloConfirmar} mostrar={mostrarSelecionar}/>

        </View>   
        
        
    </KeyboardAvoidingView>

   
)
}

export default CriarAtividade

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Fundo,
        //justifyContent: 'center'
    },
    card: {
        flex: 0.8,
        marginTop: 50,
       // backgroundColor: 'white',
        width: "80%",
       // alignItems: 'center',
       justifyContent: 'center',
        alignSelf: 'center'
        
    },
    cardButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        alignSelf: 'center'
      
    },
    titulo: {
        color: Colors.botaoEscuro,
        
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        color: 'black',
        fontSize: 22,
        width: '80%',
        alignSelf: 'center', 
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
    botaoHelp: {
        backgroundColor: Colors.help,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 90,
        height: 35,
        borderWidth: 1,
    },
    textoBotao: {
        color: Colors.textoBranco,
        fontSize: 22
    },
    textoBotaoCabecalho: {
        color: Colors.textoBranco,
        fontSize: 18,
      
    },
    textInput: {
        backgroundColor: 'white',
        width: '80%',
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
        alignSelf: 'center',
        fontSize: RFValue(20),
       
        
    },selectpicker: {
        backgroundColor: 'white',
        width: '80%',
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
        alignSelf: 'center',
        fontSize: 20,
        justifyContent: 'center',
    },
    textoGeral: {
        color: 'black', 
        textAlign: 'center'
    },
     botaoCabecalho: {
        //  position: 'relative',
          backgroundColor: 'green',
          width: 50,
          height: 50,
          borderRadius: 50,     
          alignSelf: 'center',
         // justifyContent: 'center',
          marginBottom: -12,
          marginLeft: 12,
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
      labelSalvar: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.botaoEscuro
      },
      corpoComponent: {
          marginTop: 30
      }
   
})
