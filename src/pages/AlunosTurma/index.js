import React, {useState, useEffect}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'

import {getAlunos} from '../../services/Alunos';
import {useNavigation} from '@react-navigation/native';
import {estatistica} from '../../services/Estatisticas'
import {RFValue} from 'react-native-responsive-fontsize'

import Colors from '../../Styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';

const AlunosTurma = ({route, navigation}) => {

    const [turma, setTurma] = useState(route.params.item);
    const [listaAlunos, setListaAlunos] = useState([]);
    const Navigation = useNavigation();

      useEffect(()=> {
        const loadAlunos = async () => Navigation.addListener('focus', async () => {
          const AlunosDaTurma = await getAlunos(route.params.item.id);
          setListaAlunos(AlunosDaTurma);
        });  
  
        loadAlunos();
  
      }, []);

const Alunos = ({item}) => (
   
        <View style={styles.card}>
            
            
             <TouchableOpacity style={styles.cardParteUm}>
                
                <Text style={{fontSize: RFValue(15), fontWeight: 'bold', textTransform: 'uppercase'}}>{item.nomeAluno}</Text>
                <Text>Login: {item.login}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: RFValue(13)}}>Situação </Text>
                    <Text  style={{color: (item.status == 'Regular' ? 'green' : 'red'), fontSize: RFValue(13)}}>{item.status}</Text>
                </View>
                
            </TouchableOpacity>
           
           <View style={styles.linhaCard}>

           </View>
            <View style={styles.cardParteDois}>
            
                  <TouchableOpacity>
                    <Icon2 style={[styles.CardIcone, {fontSize: RFValue(30)}]} name="file-edit" /> 
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {navigation.navigate("Estatisticas", {turma: route.params.item, aluno: item, atividade: 1})}}
                  >
                    <Icon style={[styles.CardIcone,{fontSize: RFValue(30)}]} name="insert-chart" /> 
                  </TouchableOpacity>
                  
              
               </View>


        </View>
    
    )


    return (
        <View style={styles.container}>
           
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Alunos Turma {JSON.stringify(turma.serieTurmaAno)}</Text>
                <TouchableOpacity 
                style={styles.botaoCabecalho}
                onPress={() => navigation.navigate("NovoAluno", route.params.item)}
                >
                    <Text style={styles.textoBotaoCabecalho}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.corpo]}> 
                <FlatList
                data={listaAlunos}
                renderItem={Alunos}
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
               onPress={() => navigation.navigate('Estatisticas', { turma, aluno: 1, atividade: 1 })}
              >
                <Icon2 style={[styles.iconeRodape, {color: 'blue'}]} name="podium" /> 
              </TouchableOpacity>

              <TouchableOpacity
               onPress={() => Alert.alert('Funcionalidade ainda não implementada!')}
              >
                <Icon3 style={[styles.iconeRodape]} name="user-graduate" /> 
              </TouchableOpacity>  

              <TouchableOpacity
              onPress={() => navigation.navigate('MinhasTurmas')}
              >
                <Icon2 style={[styles.iconeRodape,{ color: Colors.voltar}]} name="logout" /> 
              </TouchableOpacity>  
      
            </View>

        </View>
    )
}

export default AlunosTurma

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
        height: 75,
        marginBottom: 8,
        borderRadius: 5,
        paddingLeft: 6
    },
    cardParteUm: {
      flex: 1,
      justifyContent: 'center' 
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
      marginRight: 1
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
        fontSize: RFValue(25),
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
        marginLeft: 8,
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
        fontSize: RFValue(50)
    },
   
})


