import React, {useState, useEffect}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity,KeyboardAvoidingView, Alert , Modal} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Colors from '../../Styles/Colors';
import NewEntryDatePicker from '../../Assets/dateSelect';
import EscolaModal from '../../Assets/escolaModal';
import moment from '../../Assets/moment';
import {getEscolas} from '../../services/Escolas';
import ListPicker from '../../Assets/listPicker';

import {addTurma} from '../../services/Turmas';

const NovaTurma = ({route, navigation}) => {
   
    const [escola, setEscola] = useState();
    const [escolaInput, setEscolaInput] = useState('');
    const [serieTurma, setSerieTurma] = useState('');
    const [obs, setObs] = useState('');
    const [ano, setAno] = useState('');
    const [abertura, setAbertura] = useState(new Date());
    const [encerramento, SetEncerramento] = useState(new Date());
    const [escolas, setEscolas] = useState('');
   // const [pesquisarEscolas, setPesquisarEscolas] = useState('davina');
   const [disabledPesquisar, setDisabledPesquisar]  = useState(false)
   
    const isValid = () => {
        if (escola !== null && serieTurma != "" && ano != "" && abertura != "" && encerramento != "" ) {
          return true;
        }
    }

    useEffect(()=> {

    //     const loadEscolas = async () => {
    //       const Escolas = await getEscolas();
    //       setEscolas(Escolas);
    //       console.log('>>>>>>>', Escolas);
    //   }  
  
    //   loadEscolas();

  
    }, []);

    const getEscola = async (pesquisarEscolas) => {

        if(pesquisarEscolas.length < 4){
            Alert.alert('Atenção','Escreva ao menos 4 letras para busca !');
            return false;
        }
         setDisabledPesquisar(true);
        // const xhr = new XMLHttpRequest();

        // xhr.open("GET", "http://educacao.dadosabertosbr.com/api/escolas?nome="+pesquisarEscolas);
        // xhr.send(null)
        // xhr.onreadystatechange = async function() {
        //   if (xhr.readyState === 4) {
        //     const res = await JSON.parse(xhr.responseText);
        //     setEscolas(res);
        //     console.log('get das eslcoas', res);
        //     setDisabledPesquisar(false);
        //   }
        // };

        fetch("http://educacao.dadosabertosbr.com/api/escolas?nome="+pesquisarEscolas,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
        },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setEscolas(data);
                setDisabledPesquisar(false);
            })
            .catch((err) => Alert.alert('Erro ao buscar escola, tente novamente mais tarde!'))

        console.log(pesquisarEscolas);
        
    }


    const toStrings = async ({item}) =>{
        setEscola(item);
        setEscolaInput(item.nome.toString());
        console.log('escpas  ',escolaInput);
    }

//    const pesquisarEscolas = () => {

//    }

    const onSave = () => {
        
        if(isValid()){
            const data = {
                        escola: {inep: escola.cod ,nome: escola.nome,cidade:  escola.cidade,estado: escola.estado},
                        serieTurmaAno: serieTurma+'-'+ano,
                        obs: obs,
                        abertura: abertura,
                        encerramento: encerramento,
                        status: "aberta"
                        }
            console.log('onsave turma', data);


            const adicionar = async () =>{
                const success = await addTurma(data);
                if(success == true) navigation.navigate('MinhasTurmas');   
            }
         
           adicionar();
       
        }else{
            Alert.alert('Preencha todos os campos Obrigatórios !');
        }

     

    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
           
        <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Nova Turma</Text>
         
        </View>

     
        <View   style={[styles.corpo]}> 

        <Text style={styles.label}>Escola: <Text style={{color: 'red'}}>*</Text></Text>

        <View style={{flexDirection: 'row', alignSelf: 'center', width: "80%"}}>
            
                    <View style={[styles.textInput, {width: '80%', },{justifyContent: 'center'}]}>
                        <Text style={[{alignSelf: 'center'}]}>{escolaInput}</Text>
                    </View>
                    <EscolaModal itensPesquisados={escolas} onChange={toStrings} onChangePesquisa={getEscola} disable={disabledPesquisar}/>
                </View>

        <Text style={styles.label}>Série/Turma: <Text style={{color: 'red'}}>*</Text></Text>
            <TextInput
                style={styles.textInput}
                value={serieTurma}
                autoCompleteType="off"
                keyboardType="default"
                onChangeText={(text) => {
                    setSerieTurma(text);
                }}
            />
            
        <Text style={styles.label}>Ano da turma: <Text style={{color: 'red'}}>*</Text></Text>
            <TextInput
                style={styles.textInput}
                value={ano}
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(text) => {
                    setAno(text);
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

            <Text style={styles.label}>Início das Aulas: <Text style={{color: 'red'}}>*</Text></Text>   
                <View style={{flexDirection: 'row', alignSelf: 'center', width: "80%"}}>
            
                    <TextInput
                        style={[styles.textInput, {width: '80%'}]}
                        value={moment(abertura).format('LL')}
                        editable={false}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            setLogin(text);
                        }}
                    />
                    <NewEntryDatePicker value={abertura} onChange={setAbertura}/>
                </View>

        <Text style={styles.label}>Encerramento das Aulas: <Text style={{color: 'red'}}>*</Text></Text>
        <View style={{flexDirection: 'row', alignSelf: 'center', width: "80%"}}>
            
            <TextInput
                style={[styles.textInput, {width: '80%'}]}
                value={moment(encerramento).format('LL')}
                editable={false}
                autoCompleteType="email"
                keyboardType="email-address"
              
                onChangeText={(text) => {
                    SetEncerramento(text);
                }}
            />
            <NewEntryDatePicker value={encerramento} onChange={SetEncerramento}/>
        </View>
    
             
        </View>
    

        <View style={styles.rodape}>
          <TouchableOpacity
          onPress={() => onSave()}
          >
            <Icon style={[styles.iconeRodape, {color: 'blue'}]} name="save"/> 
          </TouchableOpacity>  
        
          <TouchableOpacity
          onPress={() => navigation.navigate('MinhasTurmas')}
          >
            <Icon2 style={[styles.iconeRodape, {color: 'red', fontSize: 45}]} name="logout" /> 
          </TouchableOpacity>  
  
        </View>
          
    </KeyboardAvoidingView>
    )
}

export default NovaTurma

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
        fontSize: 15,
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
     
          paddingTop: 55
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
      corpo: {
        marginTop: 5,
       
    },
})

