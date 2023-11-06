import React, {useState, useEffect}  from 'react'
import { StyleSheet,ScrollView, Text, View, TextInput, TouchableOpacity,KeyboardAvoidingView, Alert } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Colors from '../../Styles/Colors';
import NewEntryDatePicker from '../../Assets/dateSelect';
import moment from '../../Assets/moment';
import {addAluno} from '../../services/Alunos';
import {RFValue} from 'react-native-responsive-fontsize'

const NovoAluno = ({route, navigation}) => {
    const [campodata, setCampoData] = useState(moment(nascimento).format('LL'));
    const [nome, setNome] = useState('');
    const [serieTurma, setSerieTurma] = useState(route.params.serieTurmaAno);
    const [serieTurmaDemonstrativo, setSerieTurmaDemonstrativo] = useState(route.params.serieTurmaAno+' - '+route.params.escola.nome);
    const [obs, setObs] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [status, setStatus] = useState('');
   
    
    const [nascimento, setNascimento] = useState(new Date());
    const [id_turma, setId_Turma] = useState(route.params.id);
    
useEffect(() => {
    console.log('dados do novo aluno da turma: ',route.params);
    
    Alert.alert('Atenção !','O novo aluno será incluído na turma: '+route.params.serieTurmaAno+' da escola: '+route.params.escola.nome+'', );
},[])

const isValid = () => {
    if (nascimento !== null && responsavel != "" && nome != "" && serieTurma != "") {
      return true;
    }
}

const onSave = () => {
        
    if(isValid()){
        const data = {
                    nascimento: nascimento,
                    sexo: "",
                    obs: obs,
                    responsavel: responsavel,
                    nomeAluno: nome,
                    status: status,
                    id_turma: id_turma 
                    }
        console.log('onsave aluno', data);


        const adicionar = async () =>{
            const success = await addAluno(data);
            if(success == true) navigation.goBack();   
        }
     
       adicionar();
   
    }else{
        Alert.alert('Preencha todos os campos Obrigatórios !');
    }

 

};


    return (
        <KeyboardAvoidingView behavior="padding"  style={styles.container}>
           
        <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Novo Aluno</Text>
         
        </View>


        <View   style={[styles.corpo]}> 

        <Text style={styles.label}>Nome Completo: <Text style={{color: 'red'}}>*</Text></Text>
            <TextInput
                style={styles.textInput}
                value={nome}
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(text) => {
                    setNome(text);
                }}
            />
        <Text style={styles.label}>Responsável Legal: <Text style={{color: 'red'}}>*</Text></Text>
            <TextInput
                style={styles.textInput}
                value={responsavel}
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(text) => {
                    setResponsavel(text);
                }}
            />
            
        <Text style={styles.label}>Série/Turma: <Text style={{color: 'red'}}>*</Text></Text>
            <TextInput
                style={styles.textInput}
                value={serieTurmaDemonstrativo}
                editable={false}
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(text) => {
                    setSerieTurmaDemonstrativo(text);
                }}
            />
            
            <Text style={styles.label}>Status:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={status}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            setStatus(text);
                    }}
            />

                    
            <Text style={styles.label}>Observação:</Text>
            
                    <TextInput
                        style={styles.textInput}
                        value={obs}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            setObs(text);
                    }}
            />

            <Text style={styles.label}>Nascimento: <Text style={{color: 'red'}}>*</Text></Text>   
                <View style={{flexDirection: 'row', alignSelf: 'center', width: "80%"}}>
            
                    <TextInput
                        style={[styles.textInput, {width: '80%'}]}
                        value={campodata}
                        editable={false}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            setNascimento(text);
                            
                        }}
                    />
                    <NewEntryDatePicker value={nascimento} onChange={setNascimento}/>
                </View>
            
        </View>

        <View style={styles.rodape}>
          <TouchableOpacity
          onPress={() => onSave()}
          >
            <Icon style={[styles.iconeRodape, {color: 'blue'}]} name="save"/> 
          </TouchableOpacity>  
        
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          >
            <Icon2 style={[styles.iconeRodape, {color: 'red', fontSize: 45}]} name="logout" /> 
          </TouchableOpacity>  
  
        </View>
          
    </KeyboardAvoidingView>
    )
}

export default NovoAluno

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
        
        fontSize: RFValue(30),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        color: 'black',
        fontSize: RFValue(22),
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
        fontSize: RFValue(19),
       
        
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
   
})

