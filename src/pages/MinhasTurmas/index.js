import React, {useState, useEffect,useFocusEffect}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import {getTurmas} from '../../services/Turmas';

import moment from '../../Assets/moment';
import {useNavigation} from '@react-navigation/native';
import {estatistica} from '../../services/Estatisticas'
import {RFValue} from 'react-native-responsive-fontsize'

import Colors from '../../Styles/Colors';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';

import {cleanUserAuth as sair} from '../../services/Auth';

const MinhasTurmas = ({navigation}) => {

  const [turmas, setTurmas] = useState();
  const Navigation = useNavigation();

  
  const deslogar = () => {
    sair();
    navigation.push('SignIn_professor');
    Alert.alert("Você saiu da Sua conta !")
  }

  const signOut =  () => {
    Alert.alert(
      "Deslogar",
      "Tem certeza que deseja SAIR da sua conta?",
      [
        {
          text: "Cancelar",
         
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => deslogar(),
          style: "default",
        },
      ],
      {
        cancelable: true,
        
      }
    );

  }

  useEffect(()=> {

      const loadTurmas = async () => Navigation.addListener('focus', async () => {
        const Turmas = await getTurmas();
        setTurmas(Turmas);
      });  

    loadTurmas();
    

  }, []);


const Turmas = ({item}) => (
   
 
        <View style={styles.card}>
            
             <TouchableOpacity style={styles.cardParteUm}>
                
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Turma: {item.serieTurmaAno}</Text>
                <Text style={{fontSize: RFValue(12)}}>{item.escola.nome}</Text>
                {/* <Text>{moment(new Date(item.abertura.seconds*1000)).format('LL')}</Text> */}
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: RFValue(15)}}>22 Alunos, turma </Text>
                    <Text  style={{color: (item.status == 'aberta' ? 'green' : 'red'), fontSize: RFValue(15)}}>{item.status}</Text>
                </View>
                
            </TouchableOpacity>
           
           <View style={styles.linhaCard}>

           </View>
            <View style={styles.cardParteDois}>
            
                  <TouchableOpacity
                   onPress={()=> navigation.navigate("AtividadesProfessor", {item})}
                  >
                    <Icon2 style={[styles.CardIcone, {fontSize: 30} ]} name="file-edit" /> 
                   
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={()=> navigation.navigate("AlunosTurma", {item})}
                  >
                    <Icon3 style={[styles.CardIcone, ]} name="user-graduate" /> 
                  </TouchableOpacity>
              
               </View>
        </View>
    
    )


    return (
        <View style={styles.container}>
           
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Minhas Turmas</Text>
                <TouchableOpacity 
                style={styles.botaoCabecalho}
                onPress={() => navigation.navigate('NovaTurma', {turmas})}
                >
                    <Text style={styles.textoBotaoCabecalho}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.corpo]}> 
                <FlatList
                data={turmas}
                renderItem={Turmas}
                keyExtractor={item => item.id}
                />
            </View>

            <View style={styles.rodape}>
              <TouchableOpacity
               onPress={() => Alert.alert('Funcionalidade ainda não implementada!')}
              >
                <Icon2 style={styles.iconeRodape} name="account-circle"/> 
              </TouchableOpacity>  
              <TouchableOpacity
              onPress={() => navigation.navigate('Estatisticas')}
              >
                <Icon2 style={[styles.iconeRodape, {color: 'blue'}]} name="podium" /> 
              </TouchableOpacity>  
              <TouchableOpacity
               onPress={() => Alert.alert('Funcionalidade ainda não implementada!')}
              >
                <Icon3 style={[styles.iconeRodape]} name="user-graduate" /> 
              </TouchableOpacity>  
              <TouchableOpacity
              onPress={() => signOut()}
              >
                <Icon2 style={[styles.iconeRodape, {color: Colors.voltar}]} name="logout" /> 
              </TouchableOpacity>  
      
            </View>

        </View>
    )
}

export default MinhasTurmas

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.Fundo,
    },
    card: {
      backgroundColor: 'white',
      flexDirection: 'row',
      width: 270,
      height: 75,
      marginBottom: 8,
      borderRadius: 5,
      paddingLeft: 6
    },
    cardParteUm: {
      flex: 1,
      alignSelf: 'center'
    },
    cardParteDois: {
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
        fontSize: RFValue(34),
      
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
        width: 50,
        height: 50,
        borderRadius: 50,     
        alignSelf: 'center',
       // justifyContent: 'center',
        marginBottom: -12,
        marginLeft: 12,
        borderColor: 'green',
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
        fontSize: RFValue(50)
    },
   
})


