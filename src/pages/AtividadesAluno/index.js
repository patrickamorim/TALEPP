import React, {useState, useEffect,useFocusEffect}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, StatusBar, ImageBackground, Alert } from 'react-native'

import {useNavigation} from '@react-navigation/native';
import { listAtividades } from '../../services/Atividade';
import {listarTestes} from '../../services/Testes'
import moment from '../../Assets/moment';
import {RFValue} from 'react-native-responsive-fontsize'

import Colors from '../../Styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon4 from 'react-native-vector-icons/dist/';

const AtividadesAluno = ({route, navigate, navigation}) => {

  const [Atividades, setAtividades] = useState([]);
  const [aluno, setAluno] = useState(route.params.infos);
  const Navigation = useNavigation();

  useEffect(async ()=> {

    

    const loadAtividades = async () => Navigation.addListener('focus', async () => {
      const AtividadesdaTurma = await listarTestes(route.params.infos.id_turma);
      setAtividades(AtividadesdaTurma);
      setAluno(route.params.infos);
    
    });  

  loadAtividades();
  
console.log()
  }, []);

  const renderAtividades = ({item}) => (
   
    
    <View style={styles.card}>
            
            
             <TouchableOpacity style={styles.cardParteUm}>
                
                <Text style={{fontSize: RFValue(15), fontWeight: 'bold', textTransform: 'uppercase'}}>Prazo: {moment(item.Data_Entrega).format('L')} - {item.titulo}</Text>
                <Text>Tipo: {item.modeloTeste}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text>Situação: </Text>
                    
                    <Text  style={{color: (item.status == 'aberto' ? 'green' : 'red')}}>{item.status}</Text>
                </View>
                
            </TouchableOpacity>
           
           <View style={styles.linhaCard}>

           </View>
            <View style={styles.cardParteDois}>
            
                  
                  <TouchableOpacity
                  onPress={() => {navigation.navigate("Responder_Atividade", {aluno, atividade: item})}}
                  >
                    <Icon2 style={[styles.CardIcone, {fontSize: RFValue(55), color: 'green'}]} name="file-check-outline" /> 
                  </TouchableOpacity>
                  
              
            </View>


        </View>
   

  )

    return (
        <View style={styles.container} >
          <StatusBar backgroundColor={Colors.BotaoConfirmar}/>
           <ImageBackground
        source={require('../../Assets/imagens/background1.png')}
        style={styles.background}
        >
        <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Minhas Atividades</Text>
            <Text style={[styles.titulo, {fontSize: RFValue(25)}]}>{aluno.nomeAluno}</Text>
           
        </View>

        
        <View style={[styles.corpo]}> 
            <FlatList
            data={Atividades}
            renderItem={renderAtividades}
            keyExtractor={item => item.id}
            />
        </View>

        <View style={styles.rodape}>
          
          <TouchableOpacity
           onPress={() => Alert.alert('Aluno: '+ aluno.nomeAluno, 'Login do aluno: '+aluno.login+ '  Responsável legal: '+aluno.responsavel+' Nascimento: '+moment(aluno.nascimento).format('L'))}
          >
            <Icon3 style={[styles.iconeRodape]} name="user-graduate" /> 
          </TouchableOpacity>  
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          >
            <Icon2 style={[styles.iconeRodape, {color: Colors.voltar}]} name="logout" /> 
          </TouchableOpacity>  
  
        </View>
        </ImageBackground>

    </View>
    )
}

export default AtividadesAluno

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Fundo,
        //justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: 280,
        height: 80,
        marginBottom: 8,
        borderRadius: 5,
        paddingLeft: 6
    },
    cardParteUm: {
      flex: 1,
      alignSelf:'center'
    },
    cardParteDois: {
     // backgroundColor: 'cyan',  
     //flexDirection: 'row',
      borderRadius: 5,
      justifyContent: 'center',
     
    }, 
    background:{
      flex: 1,
      resizeMode: 'cover',
      width:'100%'
    },
    CardIcone: {
      fontSize: 25,
      alignSelf: 'center',
      paddingTop: 1,
      paddingLeft: 1,
      
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
      //  width: "80%",
        alignItems: 'center',
       //justifyContent: 'center',
        alignSelf: 'center'
        
    },
    titulo: {
        color: Colors.botaoEscuro,
        //flex: 1,
        fontSize: RFValue(35),
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
        //flexDirection: 'row',
   
        paddingTop: 40
    },
    rodape: {
        marginBottom: -50,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
      //  backgroundColor: Colors.Fundo,
        flexDirection: 'row',
    },
    iconeRodape: {
        marginHorizontal: 10,
        fontSize: 50
    },
   
})



