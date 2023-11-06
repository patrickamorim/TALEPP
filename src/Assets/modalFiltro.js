import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TouchableHighlight, Alert, KeyboardAvoidingView, Animated } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome';
import Colors from '../Styles/Colors';
import { estatistica, carregarTurmasFiltro, carregarAtividadesFiltro, carregarAlunosFiltro } from '../services/Estatisticas';
import { color } from 'react-native-reanimated';

const ModalFiltro = ({ turma, estatisticas, setTitulos }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [turmas, setTurmas] = useState([{ id: 1, serieTurmaAno: 'tuma 1' }, { id: 3, serieTurmaAno: 'turma 3' }]);
  const [Atividade, setAtividade] = useState([{ id: 1, titulo: 'todas' }]);
  const [Aluno, setAluno] = useState([{ id: 1, nomeAluno: 'todos' }]);
  const [selectedValueTurma, setSelectedValueTurma] = useState(1);
  const [selectedValueAtividade, setSelectedValueAtividade] = useState(1);
  const [selectedValueAluno, setSelectedValueAluno] = useState(1);
  // const [animacao, setAnimacao] = useState(80);

  const setFiltro = async (turma, atividade, estatisticas, setTitulos) => {

    if (turma != null) { setAtividade(await carregarAtividadesFiltro(turma)) }
    console.log('eiii listen', turma)

    setAluno(await carregarAlunosFiltro(turma, atividade))
  }

  return (
    <KeyboardAvoidingView behavior="position" >

      <TouchableOpacity onPress={() => [setModalVisible(!modalVisible), setTurmas(turma)]}>
        <Icon2 style={[styles.iconeRodape, { color: 'black' }]} name="filter" />
      </TouchableOpacity>

      <Modal

        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(false);
        }}
      >

        <View style={styles.centeredView}>

          <View style={styles.background}></View>

          <View style={[styles.modalView]}>

            <Text style={{ fontSize: 30 }}>Filtros</Text>

            <Text></Text>
            <Text style={{ fontSize: 20, alignSelf: 'flex-start', paddingLeft: 2 }}>Turma</Text>

            <View style={styles.selectpicker} >
              <Picker
                numberOfLines={5}
                selectedValue={selectedValueTurma}
                onValueChange={(itemValue, itemIndex) => {
                  //renderDados(itemValue);
                  setSelectedValueTurma(itemValue);
                  setFiltro(itemValue, 1);
                  // setTurmas(carregarAtividadesAlunosFiltro(itemValue))
                }}>

                <Picker.Item label={'todas'} value={1} key={null} />

                {Object.keys(turmas).map((key) => {
                  //  console.log(turma)
                  return (<Picker.Item label={turmas[key].serieTurmaAno} value={turmas[key].id} key={turmas[key].id} />)
                })}

              </Picker>

            </View>

            <Text style={{ fontSize: 20, alignSelf: 'flex-start', paddingLeft: 2 }}>Atividade</Text>

            <View style={styles.selectpicker} >
              <Picker
                selectedValue={selectedValueAtividade}
                onValueChange={(itemValue, itemIndex, key) => {
                  //renderDados(itemValue);
                  setSelectedValueAtividade(itemValue);
                  setFiltro(selectedValueTurma, itemValue);
                }}>
                  
                <Picker.Item label={'todas'} value={1} key={null} />
                {Object.keys(Atividade).map((key) => {
                  return (<Picker.Item label={Atividade[key].titulo} value={Atividade[key].id} key={Atividade[key].id} />)
                })}

              </Picker>

            </View>
            <Text style={{ fontSize: 20, alignSelf: 'flex-start', paddingLeft: 2 }}>Aluno</Text>

            <View style={styles.selectpicker} >
              <Picker

                selectedValue={selectedValueAluno}
                onValueChange={(itemValue, itemIndex) => {
                  //renderDados(itemValue);
                  setSelectedValueAluno(itemValue);

                }}>
                <Picker.Item label={'todos'} value={1} key={null} />
                {Object.keys(Aluno).map((key) => {
                  return (<Picker.Item label={Aluno[key].nomeAluno} value={Aluno[key].id} key={Aluno[key].id} />)

                })}
              </Picker>

            </View>
              <View style={{flexDirection: 'row'}}>
                
              <TouchableOpacity 
              style={[styles.botaoConfirmar]}
              onPress={() => 
                {[estatisticas(selectedValueTurma, selectedValueAluno, selectedValueAtividade), setModalVisible(!modalVisible),
                  setTitulos(selectedValueTurma, selectedValueAluno, selectedValueAtividade)
                ]}}>
                  <Text   style={[styles.textoBotao]} name="filter">Filtrar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={[styles.botaoConfirmar, {backgroundColor: 'white'}]}
              onPress={() => [setModalVisible(!modalVisible)]}>
                   <Icon2 style={[styles.textoBotao, { color: Colors.voltar }]} name="close-thick" />
              </TouchableOpacity>

              </View>
          </View>
          
          <View style={styles.background}></View>
        </View>

      </Modal>

    </KeyboardAvoidingView>
  )
}

export default ModalFiltro

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.BotaoClaro,
    width: 59,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 2,
    borderWidth: 1,
  },
  selectpicker: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    fontSize: 20,
    justifyContent: 'center',
  },
  background: {
    backgroundColor: Colors.Fundo,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  centeredView: {
    flex: 1,
    // height: '80%',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    alignContent: 'center',
    //backgroundColor: 'red',

    //marginTop: 22
  },
  modalView: {
    width: "80%",
    opacity: 1,
    //  marginBottom: 0,
    // marginTop: 30,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'blue',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlignVertical: 'center'
  },
  label: {
    color: 'black',
    fontSize: 22,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -10
  },
  labelCenter: {
    color: 'black',
    fontSize: 40,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -10,
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: 'white',
    width: '85%',
    height: "100%",
    borderRadius: 3,
    borderWidth: 1,
    alignSelf: 'flex-start',
    fontSize: 16,
    textAlignVertical: 'top',

  },
  instrucoes: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.botaoEscuro,
    width: 270,
    height: '65%',
    marginBottom: 15,
    alignItems: 'center',
  },
  flatList: {
    marginTop: 25
  },
  itensDaLista: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    marginVertical: 5,
  },
  textoLista: {
    fontSize: 20,
    //margin: 2
  },
  botaoConfirmar: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: '30%',
   // height: 35,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 15
  },
  botaoAtualizar: {
    backgroundColor: Colors.BotaoConfirmar,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 5,
    width: 80,
    height: 25,
    borderWidth: 1,

  }, botaoEnviarAtividade: {
    backgroundColor: Colors.voltar,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    marginTop: 10,
    width: 130,
    height: 30,
    borderWidth: 1,

  },
  textoBotao: {
    color: Colors.textoBranco,
    fontSize: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  rodape: {
    //  marginBottom: -50,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Colors.Fundo,
    flexDirection: 'row',
  },
  iconeRodape: {
    marginHorizontal: 10,
    fontSize: 45
  },
  iconeFiltrar: {
    paddingTop: 10,
    backgroundColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    width: '30%',
    height: 30,
    alignItems: 'center'
  },
  play: {
    color: 'blue',
    marginTop: 20,
    fontSize: 80,
    // justifyContent: 'center',
    alignSelf: 'center',

  }, botaoCabecalho: {
    //  position: 'relative',
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    //   marginBottom: -12,
    // marginLeft: 12,
    borderColor: 'black',
    borderWidth: 1
  }, botaoGravar: {
    //  position: 'relative',
    //backgroundColor: 'red',
    width: 70,
    height: 70,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    //   marginBottom: -12,
    // marginLeft: 12,
    borderColor: 'grey',
    borderWidth: 3,

    alignContent: 'center',
  }
})
