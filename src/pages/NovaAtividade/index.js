import React, {useState, useEffect}  from 'react'
import { StyleSheet,ScrollView, Text, View, TextInput, TouchableOpacity,KeyboardAvoidingView, Alert } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Colors from '../../Styles/Colors';
import NewEntryDatePicker from '../../Assets/dateSelect';
import moment from '../../Assets/moment';
import {dividirEmFrases, normalizarFrase} from '../../Assets/separarTexto';
import {addAtividade} from '../../services/Atividade';
import CriarAtividade from '../../components/CriarAtividade';
import {addTeste} from '../../services/Testes'

const NovaAtividade = ({route, navigation}) => {
    const [campodata, setCampoData] = useState(moment(entrega).format('LL'));
   
    const [serieTurma, setSerieTurma] = useState(route.params.serieTurmaAno);
    const [serieTurmaDemonstrativo, setSerieTurmaDemonstrativo] = useState(route.params.serieTurmaAno+' - '+route.params.escola);
   
    
    const [atividadeOk, setAtividadeOk] = useState(false);

    const [status, setStatus] = useState('aberto');
    const [entrega, setEntrega] = useState(new Date());
    const [titulo, setTitulo] = useState("");
    const [atividade, setAtividade] = useState();
    const [frases, setFrases] = useState();
    const [modeloTeste, setModeloTeste] = useState("");
    const [TesteTemp, setTesteTemp] = useState("1");
    const [id_turma, setId_Turma] = useState(route.params.id);
    
    useEffect(() => {
        console.log('Atividade: ',route.params.serieTurmaAno);
        
        //setTesteTemp(getTesteTemp);
     
       //setTesteTemp(getTesteTemp(modeloTeste));
       
       Alert.alert('Atenção !','A nova atividade será adiciona à turma: '+route.params.serieTurmaAno+' da escola: '+route.params.escola.nome+'', );
    },[])


    const isValid = () => {
        if ( titulo != "" && modeloTeste != "") {
          return true;
        }
    }


    const onSave = async () => {
       
        if(isValid()){
            const data = {
                        titulo: titulo,
                        modeloTeste: modeloTeste,
                        data: new Date(),
                        entrega: entrega,
                        status: status,
                        id_turma: id_turma,
                        TesteTemp: TesteTemp,
                        }
            console.log('onsave atividade', data);


            const adicionar = async () =>{
                const success = await addTeste(data);
                 if(success == true) navigation.goBack();   
            }
         
            Alert.alert(
                "Salvar",
                "Deseja salvar a atividade?",
                [
                  {
                    text: "Cancelar",
              
                    style: "cancel"
                  },
                  { text: "Salvar", onPress: () => adicionar() }
                ]
              );
          

           
       
        }else{
            Alert.alert('Preencha todos os campos Obrigatórios !');
        }
        


       // console.log('onSave ===>', titulo, moment(entrega).format('LL'), modeloTeste, atividade, atividadeOk,'frase '+frasesTemp);
        //dividirEmFrases(atividade, modeloTeste );

    }


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
           
        <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Nova Atividade</Text>
         
        </View>

        <CriarAtividade dataInput= {entrega} TesteTemp = {setTesteTemp} setdataInput= {setEntrega} setTitulo = {setTitulo} setModelo= {setModeloTeste} getModeloTeste = {TesteTemp} setAtividade={setAtividade} setAtividadeOk={setAtividadeOk}
      
        />

        

        <View style={styles.rodape}>
          <TouchableOpacity
          onPress={()  => onSave()}
          disabled={!atividadeOk}
          >
            <Icon style={[styles.iconeRodape, atividadeOk ? {color: 'blue'} : {color: 'gray'}]} name="save"/> 
          </TouchableOpacity>  
        
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          >
            <Icon2 style={[styles.iconeRodape, {color: 'red'}]} name="logout" /> 
          </TouchableOpacity>  
  
        </View>
          
    </KeyboardAvoidingView>
    )
}

export default NovaAtividade

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
        width: 90,
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
        fontSize: 20,
       
        
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
          marginTop: 20,
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

