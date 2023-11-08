import React, {useState, useEffect,useFocusEffect}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import CheckBox from '@react-native-community/checkbox';

import {getPalavrasTeste, getRespostas} from '../../services/Testes';
import RenderPalavras from '../../components/RenderPalavras'
import { DownloadAudio } from '../../services/DownloadAudio';
import moment from '../../Assets/moment';
import {useNavigation} from '@react-navigation/native';

import {corrigir} from '../../services/Testes'

import Colors from '../../Styles/Colors';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';

import {cleanUserAuth as sair} from '../../services/Auth';

const CorrigirAtividades = ({route, navigate, navigation}) => {

  const [turmas, setTurmas] = useState(route.params.item);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [atividade, setAtividade] = useState();
  const Navigation = useNavigation();
  const [audioPath, setAudioPath] = useState(AudioUtils.DocumentDirectoryPath);
  const [urlAudio, setUrlAudio] = useState("");
  const [respostas, setRespostas] = useState();
  
  useEffect(()=> {

    const loadRespostas = async () => Navigation.addListener('focus', async () => {
     const respostasBaixadas = await getRespostas(route.params.item.id);
      
      setAtividade(route.params.item);
      setRespostas(respostasBaixadas);
    });  

  loadRespostas();

}, []);


const salvarCorrecao = async (palavras, resposta) => {
  
  let salvar; 
  salvar = await corrigir(palavras, resposta);

 if(salvar == true){
 // navigation.goBack();
 setRespostas(await getRespostas(route.params.item.id));
 }

}
 
    const renderAtividades = ({item}) => (
   
    <View>

      <View style={styles.card}>
              
              <TouchableOpacity style={styles.cardParteUm}>
                  
                  <Text style={{fontSize: 15, fontWeight: 'bold', textTransform: 'uppercase'}}>{item.aluno}</Text>
                  {/* <Text>Tipo: </Text>
                  <View style={{flexDirection: 'row'}}>
                      <Text>Situação: </Text>
                      
                      <Text  style={{color: (item.status == 'aberto' ? 'green' : 'red')}}>{item.corrigido}</Text>
                  </View>
                  */}
              </TouchableOpacity>
            
            <View style={styles.linhaCard}>

            </View>
                <View style={styles.cardParteDois}>
                
                    <Text >Corrigido</Text>
                    
                    <CheckBox
                      disabled={false}
                      value={item.corrigido}
                      //onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                      
                </View>

      </View>
      <View style={styles.card2}>
      <Text style={{ fontSize: 12, color: 'white' }}>Tempo de Resposta do Teste: {moment.utc(item.tempoDoTeste * 1000).format('mm:ss')} min</Text>
      </View>
      <View style={styles.cardPT2}>
              
              <TouchableOpacity style={styles.cardParteUm}
                onPress={() => Alert.alert('Correção:', 'Para corrigir cada palavra clique no ícone da caixa de som para escutar a gravação e marque o campo "Ação" caso a leitura esteja correta.')}
              >
                
                <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 20}}>Palavra</Text>
              
                <View style={styles.linhaCard}></View>
                
                <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 20}}>Áudio</Text>
               
                <View style={styles.linhaCard}></View>

                <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 20}}>Ação</Text>

              </TouchableOpacity>

      </View>
      <View style={styles.cardPT3}>
              
                
                  <RenderPalavras respostas = {item} salvarCorrecao = {salvarCorrecao}/>
      </View>

    </View>
   

  )

    return (
        <View style={styles.container}>
           
           <View style={styles.cabecalho}>

            <Text style={styles.titulo}>Respostas - {route.params.item.titulo}</Text>
           
        </View>

        <View style={[styles.corpo]}> 
            <FlatList
            data={respostas}
            renderItem={renderAtividades}
            keyExtractor={item => item.id}
            />
        </View>

        <View style={styles.rodape}>
          
          <TouchableOpacity>
            <Icon3 style={[styles.iconeRodape]} name="user-graduate" /> 
          </TouchableOpacity>  
          <TouchableOpacity
          onPress={() => navigation.goBack()}
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
        height: 25,
        marginBottom: 2,
        borderRadius: 5,
        paddingLeft: 6
    },
    card2: {
        backgroundColor: Colors.BotaoConfirmar,
        //flexDirection: 'row',
        width: 270,
      //  height: 25,
        marginBottom: 8,
        borderRadius: 5,
        paddingLeft: 6,
        alignItems:'center'
    },
    cardPT2: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: 270,
        //height: 25,
        marginBottom: 8,
        marginTop: -6,
        borderRadius: 5,
        paddingLeft: 6
    },
    cardPT3: {
        backgroundColor: 'white',
        //flexDirection: 'row',
        width: 270,
       // alignContent: 'center',
        //height: 25,
        marginBottom: 8,
        marginTop: -6,
        borderRadius: 5,
        //paddingLeft: 6
    },
    cardParteUm: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    },
    cardParteDois: {
     // backgroundColor: 'cyan',  
      borderRadius: 5,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    },
    CardIcone: {
      fontSize: 25,
      alignSelf: 'center',
      paddingHorizontal: 6,
      
    },
    linhaCard: {
      backgroundColor: 'black',
      width: 2,
      height: 19,
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


