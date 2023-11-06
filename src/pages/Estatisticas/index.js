import React, { useState, useEffect, useFocusEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { getTurmas } from '../../services/Turmas';
import ModalLegendas from '../../Assets/modalLegendas';
import ModalFiltro from '../../Assets/modalFiltro';
import { Picker } from '@react-native-picker/picker';
import moment from '../../Assets/moment';
import {RFValue} from 'react-native-responsive-fontsize'

import { classesPalavras } from '../../Assets/presenter';
import { useNavigation } from '@react-navigation/native';
import { estatistica, carregarTurmasFiltro, titulosEstatistica } from '../../services/Estatisticas';

import Colors from '../../Styles/Colors';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';

export default function Estatistica({ navigation, route}) {

  const [dadosPalavras, setDadosPalavras] = useState();
  const [dadosPseudo, setDadosPseudo] = useState();
  const [classeAtual, setClasseAtual] = useState();
  const [tempoMedioPP, setTempoMedioPP] = useState();
  const [tempoMedioP, setTempoMedioP] = useState();
  const [tempoMedio, setTempoMedio] = useState(0);
  const [selectedValue, setSelectedValue] = useState('dadosPalavras');

  const [turma, setTurma] = useState();
  const [turmaTitle, setTurmaTitle] = useState('todas');
  const [atividade, setAtividade] = useState('todas');
  const [aluno, setAluno] = useState('todos');
  const [showThing, setShowThing] = useState(false);

  const Navigation = useNavigation();

  useEffect(() => {
//console.log('aaaaaaaaaaaaaaaaaaaaaaa  >>>>>>>>>>>>>>>>>', route.params.atividade)
    const loadDados = async () => Navigation.addListener('focus', async () => {
      const estatisticas = await estatistica(
        route.params == undefined ? 1: route.params.turma.id,
        route.params == undefined ? 1: route.params.aluno.id,
        route.params == undefined ? 1: route.params.atividade.id
      );
      const turmaLista = await carregarTurmasFiltro();
      if(estatisticas == false){
        navigation.goBack();
        Alert.alert('Essa Turma ainda não possui atividades corrigidas!')
      } else {
      setDadosPalavras(estatisticas.somatorioPalavras);
      setClasseAtual(estatisticas.somatorioPalavras);
      setDadosPseudo(estatisticas.somatorioPseudoPalavras);
      setTempoMedioPP(estatisticas.tempoMedioPseudoPalavras);
      setTempoMedioP(estatisticas.tempoMedioPalavras);
      setTempoMedio(estatisticas.tempoMedioPalavras);

      setTurma(turmaLista != undefined ? turmaLista: null); //filtro
      
      setTurmaTitle(route.params == undefined ? 'Todas': route.params.turma.serieTurmaAno);
      setAluno(route.params == undefined ? 'Todos': (route.params.aluno == 1 ? "Todos": route.params.aluno.nomeAluno));
      setAtividade(route.params == undefined ? 'Todas': (route.params.atividade == 1 ? "Todas": route.params.atividade.titulo));
     
     

      setShowThing(true);
      }
    });

    loadDados();

  }, []);

  const setTitulos = async (turma, aluno, atividade) => {

    let titulosEstatisticas = await titulosEstatistica(turma, aluno, atividade);
    console.log(titulosEstatisticas.turma)
     setTurmaTitle(titulosEstatisticas.turma);
     setAtividade(titulosEstatisticas.atividade);
     setAluno(titulosEstatisticas.aluno);
  }

  const estatisticas = async (turma, aluno, atividade) => {
    const estatisticas = await estatistica(turma, aluno, atividade);

    if(estatisticas == false){
      Alert.alert('Não há dados para o filtro selecionado, tente outros dados !')
    }else{
      setDadosPalavras(estatisticas.somatorioPalavras);
      setClasseAtual(estatisticas.somatorioPalavras);
      setDadosPseudo(estatisticas.somatorioPseudoPalavras);
      setTempoMedioPP(estatisticas.tempoMedioPseudoPalavras);
      setTempoMedioP(estatisticas.tempoMedioPalavras);
      setTempoMedio(estatisticas.tempoMedioPalavras);

      console.log('estatisticas do ModalFiltro', estatisticas)
    }
      console.log('estatisticas do ModalFiltro', turma, aluno, atividade)
  }

  const renderDados = (itemValue) => {
    itemValue == 'dadosPalavras' ? setClasseAtual(dadosPalavras) : setClasseAtual(dadosPseudo);
  }

  const Dados = ({ item }) => (

    <View style={styles.card}>

      <TouchableOpacity style={[styles.cardParteUm, { paddingLeft: 5 }]}
        onPress={() => Alert.alert('PALAVRAS ERRADAS NESTE PADRÃO SILÁBICO:', ' ' + item.erradas)}
      >

        <Text style={{ fontSize: RFValue(20), fontWeight: '900' }}>{classesPalavras(item.classe)}</Text>

      </TouchableOpacity>

      <View style={[styles.linhaCard]}>

      </View>
      <View style={styles.cardParteDois}>


        <TouchableOpacity
          onPress={() => Alert.alert('', item.true + ' respostas corretas e ' + item.false + ' respostas erradas neste padrão silábico')}
        >
          <Text style={[{ fontSize: RFValue(21), fontWeight: '900' }]}>
            {((item.true) / ((item.true) + (item.false)) * 100).toFixed(2)}%
          </Text>
        </TouchableOpacity>

      </View>
    </View>

  )

  return (

    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Estatísticas Gerais</Text>
        <View style={styles.cabecalho2}>
        <Text style={[styles.substitulo, {fontSize: RFValue(15), color: 'blue'}]}>Turma: {turmaTitle} - </Text>
        <Text style={[styles.substitulo, {fontSize: RFValue(15), color: 'blue'}]}>Atividade: {atividade} </Text>
        </View>
        <Text style={[styles.substitulo, {fontSize: RFValue(15)}]}>Aluno: {aluno} </Text>
      </View>

      <View style={[styles.corpo]}>

        <View style={[styles.cardTitle,{backgroundColor: Colors.Fundo}]}>

          <View style={styles.selectpicker} >
            <Picker
              
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                renderDados(itemValue);
                setSelectedValue(itemValue);
                setTempoMedio(itemValue == 'dadosPalavras' ? tempoMedioP : tempoMedioPP)
              }}>
              <Picker.Item style={{fontSize: RFValue(15)}} label="Palavras" value="dadosPalavras" />
              <Picker.Item style={{fontSize: RFValue(15)}} label="PseudoPalavras" value="dadosPseudo" />

            </Picker>
          </View>

        </View>

        <TouchableOpacity style={[styles.cardTempo, { alignItems: 'center' }]}>
          <Text style={{ fontSize: RFValue(12), color: 'white' }}>Tempo Médio dos Testes: {moment.utc(tempoMedio * 1000).format('mm:ss')} min</Text>
        </TouchableOpacity>

        <View style={styles.cardTitle}>

          <TouchableOpacity style={[styles.cardParteUm, { alignItems: 'center' }]}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Padrão Silábico</Text>
          </TouchableOpacity>


          <View style={[styles.linhaCard, { backgroundColor: Colors.Fundo }]}>

          </View>

          <TouchableOpacity style={[styles.cardParteDois]}
            onPress={() => { }}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Acerto</Text>
          </TouchableOpacity>

        </View>

        <FlatList
          data={classeAtual}
          renderItem={Dados}
          keyExtractor={item => item.classe}
        />

      </View>

      <View style={styles.rodape}>

       { showThing && <ModalFiltro turma = {turma} estatisticas = {estatisticas} setTitulos = {setTitulos} /> }

        <ModalLegendas />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon2 style={[styles.iconeRodape, { color: Colors.voltar }]} name="logout" />
        </TouchableOpacity>

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Fundo,
    //justifyContent: 'center'
  }, selectpicker: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    fontSize: RFValue(20),
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: 280,
    //height: 70,
    marginBottom: 4,
    borderRadius: 1,
    paddingLeft: 6
  },
  cardTitle: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    color: 'white',
    width: 280,
    //height: 70,
    marginBottom: 4,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    //paddingLeft: 6
  },
  cardTempo: {
    backgroundColor: Colors.botaoAdicinoar,
    // flexDirection: 'row',
    color: 'white',
    width: 280,
    //height: 70,
    marginBottom: 3,
    borderRadius: 5,
    alignSelf: 'center'
    //paddingLeft: 6
  },
  cardParteUm: {
    flex: 1,
    //alignItems: 'center'
  },
  cardParteDois: {
    // backgroundColor: 'cyan',  
    width: 80,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center'
  },
  CardIcone: {
    fontSize: 25,
    alignSelf: 'center',
    paddingHorizontal: 6,

  },
  linhaCard: {
    backgroundColor: Colors.Fundo,
    width: 3,
    height: '100%',
    alignSelf: 'center',
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
  substitulo: {
    color: 'black',
    //flex: 1,
    fontSize: RFValue(30),
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
   // flexDirection: 'row',

    paddingTop: 70
  },
  cabecalho2: {
    justifyContent: 'center',
    backgroundColor: Colors.FundoClaro,
    flexDirection: 'row',

    //paddingTop: 70
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