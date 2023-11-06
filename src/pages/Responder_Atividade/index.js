import React, {useState, useEffect,useFocusEffect}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert , ImageBackground, SafeAreaView} from 'react-native'
import {getTurmas} from '../../services/Turmas';
import {getPalavrasTeste} from '../../services/Testes';
import speech,{stopSpeech} from '../../Assets/textToSpeech';
import {ResponderAtividade, SalvarAtividade, setTempoAtividade, getTempoAtividade} from '../../services/ResponderAtividade';
import moment from '../../Assets/moment';
import {RFValue} from 'react-native-responsive-fontsize'
import {useNavigation} from '@react-navigation/native';
import App from './App2';
import  ResponderModal from '../../Assets/responderModal';
import  ModalWait from '../../Assets/modalWait';


import Colors from '../../Styles/Colors';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';


const Responder_Atividade = ({navigation, route}) => {


    const [atividade, setAtividade] = useState('aaaaaaaa');
    // const [contRespostas, setContRespostas] = useState(1);
    const [aluno, setAluno] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [arrayPalavras, setArrayPalavras] = useState();
    const [indexPalavrasLength, setIndexPalavrasLenght] = useState();
    const [indexPalavrasAtual, setIndexPalavrasAtual] = useState(0);
    const [aparecerIndex, setAparecerIndex] = useState(false);
    const [tempoInicio, setTempoInicio] = useState('');
    const [caminhoAudio, setCaminhoAudio] = useState();
    const [palavraAtual, setPalavraAtual] = useState();
    const [jaRespondeu, setJaRespondeu] = useState(false);
    const [instrucoes, setInstrucoes] = useState('Para responder cada palavra aperte no botão vermelho. quando ele estiver verde, leia a palavra em voz alta.'
                                                +'\b Aperte o botão "Próxima" para ler a próxima palavra e repita esses passos até  chegar na última palavra. Então, pressione enviar Respostas !');


  const Navigation = useNavigation();

  useEffect( async () => {

    const palavras = await getPalavrasTeste(route.params.atividade);
    setArrayPalavras(palavras);
    setIndexPalavrasLenght(palavras.length)
    setAtividade(route.params.atividade);
    setAluno(route.params.aluno);
    setIndexPalavrasAtual(0)
    setCaminhoAudio(route.params.atividade.Id_turma+'/'+route.params.atividade.id+'/'+route.params.aluno.id)
    setPalavraAtual(palavras[0]);
    
    if(await getTempoAtividade(route.params.atividade.id, route.params.aluno.id) !== null)
    setJaRespondeu(true)

    falar();
  }, [instrucoes]);

  const falar = () => {
    setTimeout(() => {
      speech(instrucoes);
    }, 1000);
    setTimeout(() => {
      speech('Para inciar o teste é só pressionar no botão verde, como o nome Iniciar, logo abaixo do quadro de instruções!.')
    }, 2000);
    
  }

  const setTempo = () => {
   setTempoAtividade(moment.duration((new Date()-tempoInicio)).asSeconds().toString(),route.params.atividade.id,route.params.aluno.id);
   console.log(Date()-tempoInicio)
  }

  // const getTempo = async () => {
  //  const a = await getTempoAtividade(route.params.atividade.id,route.params.aluno.id);
  //   console.log(a);
  // }

  const getAnteriorPalavra = async() => {

    if(indexPalavrasAtual>0){
      // setContRespostas(contRespostas-1);
      setIndexPalavrasAtual(indexPalavrasAtual-1);
      setPalavraAtual(arrayPalavras[indexPalavrasAtual-1]);
    }
    // console.log(contRespostas);
  }

  const getProximaPalavra =  () => {

    if(indexPalavrasAtual<indexPalavrasLength-1){
      // setContRespostas(contRespostas+1);
      setIndexPalavrasAtual(indexPalavrasAtual+1);
      setPalavraAtual(arrayPalavras[indexPalavrasAtual+1])
    }
    if(indexPalavrasLength-1 == indexPalavrasAtual){
      setTempo();
      Alert.alert('Finalizar Teste !!!', 'Para finalizar e enviar o teste para correção APERTE em "ENVIAR", ou Envie mais tarde, caso não tenha internet no momento.', [
        {text: 'Enviar Mais Tarde', onPress: () => { setJaRespondeu(true)}},
        {text: 'Enviar', onPress: () => { setModalVisible(true), salvareEnviarAtividade()}},
      ]);
    }
  }

  const salvareEnviarAtividade = async () => {
   
    //setTempo();
    setModalVisible(true);
  //  setEnviandoAtividade('Enviando Atividade');s
    const atividadeEnviada = await SalvarAtividade(arrayPalavras, caminhoAudio, atividade, aluno, indexPalavrasLength, navigation);
   
  }

    return (
      
        <View style={styles.container} >
        <StatusBar backgroundColor={Colors.BotaoConfirmar}/>
           
           <ImageBackground
        source={require('../../Assets/imagens/background1.png')}
        style={styles.background}
        >
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Responder Atividade</Text>
            </View>

            <View style={[styles.corpo]}>
              <Text style={{fontSize: 20}}>Instruções do Teste !</Text>
              <View style={styles.instrucoes}>
                
                <Text></Text>  
                <Text style={{fontSize: RFValue(18)}}>Este Teste contem {indexPalavrasLength} Palavras</Text>
                <Text></Text>
                <Text style={{textAlign: 'justify', fontSize: RFValue(17), paddingHorizontal: 10}}>{instrucoes}</Text>
              
              </View>

                  <ResponderModal
                  indexPalavras = {indexPalavrasLength} indexPalavrasAtual = {indexPalavrasAtual} atividade = {atividade}
                  proximaPalavra = {getProximaPalavra} anteriorPalavra = {getAnteriorPalavra}
                  arrayPalavras = {arrayPalavras} aparecerIndex={aparecerIndex} setAparecerIndex={setAparecerIndex}
                  caminhoAudio = {caminhoAudio} palavraAtual = {palavraAtual} aluno= {aluno} jaRespondeu = {jaRespondeu}
                  setTempoInicio = {setTempoInicio} stopSpeech = {stopSpeech} salvarAudio = {salvareEnviarAtividade}
                  />

            </View>

            <View style={styles.rodape}>
              <TouchableOpacity
              onPress={() => getTempoAtividade()}
              >
                <Icon2 style={styles.iconeRodape} name="account-circle"/>
              </TouchableOpacity>  
              <TouchableOpacity
              >
                <Icon2 style={[styles.iconeRodape, {color: 'blue'}]} name="podium" />
              </TouchableOpacity>  
              <TouchableOpacity>
                <Icon3 style={[styles.iconeRodape]} name="user-graduate" />
              </TouchableOpacity>  
              <TouchableOpacity
              onPress={() => {navigation.goBack(), stopSpeech()}}
              >
                <Icon2 style={[styles.iconeRodape, {color: Colors.voltar}]} name="logout" />
              </TouchableOpacity>  
     
            </View>

            <ModalWait modalVisible = {modalVisible} setModalVisible={setModalVisible}/>
            </ImageBackground>
        </View>
    )
}

export default Responder_Atividade

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Fundo,
        //justifyContent: 'center'
    },
    instrucoes: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 15,
      borderColor: Colors.botaoEscuro,
      width: '95%',
      height: '65%',
      marginBottom:15,
      alignItems: 'center',
    },
    background:{
      flex: 1,
      resizeMode: 'cover',
      width:'100%'
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
       
    }, textInput: {
      backgroundColor: 'white',
     // width: 200,
      height: "100%",
      borderRadius: 3,
      borderWidth: 1,
      //alignSelf: 'flex-start',
      fontSize: 16,
      textAlignVertical: 'top',
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
    textoGeral: {
        color: 'black',
        textAlign: 'center'
    },
    botaoCabecalho: {
      //  position: 'relative',
        backgroundColor: Colors.botaoAdicinoar,
        width: 50,
        height: 50,
        borderRadius: 50,    
        alignSelf: 'center',
        justifyContent: 'center',
        //marginBottom: -12,
      //  marginLeft: 12,
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
    }
   
})







