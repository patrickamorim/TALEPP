import {Alert} from 'react-native';

import moment from '../Assets/moment';

import {getUserAuth} from './Auth';

import {getUUID} from './Uuid';
import firestore,{doc} from '@react-native-firebase/firestore';


export const addAtividade = async entradas => {

let data = {};

console.log('entradas: ', entradas);
try {
  data = {
       titulo: entradas.titulo,
       texto: entradas.texto,
       modeloTeste: entradas.modeloTeste,
       data: entradas.data,
       entrega: entradas.entrega,
       status: entradas.status,
       id_Turma: entradas.id_turma,
       
       //frases: entradas.frases,
       
  }

    const atividadeCriada = await firestore()
      .collection('atividade')
      .add(data);
   
     addFrases(atividadeCriada, entradas.frases, entradas.entrega);

          //adiconar collectione subcollection
    // try{

    //   const ref = await firestore()
    //    .collection('escola').doc('777')
    //    .set({ cidade: "poções-ba", nome: "esCROLTA professor rainmundo" });
       
    //   await firestore()
    //   .collection('escola').doc('66666666').collection('estado').doc('ce')
    //     .set({ nome: "ceaRA"});
     
    //    }catch(error){
    //  console.log('erro ao inserir escola');
     
    //    }
      
   Alert.alert("Atividade salva com sucesso !",
                "O texto da sua atividade: \n\n"+entradas.frases
               );
 
  console.log('addTurma :: data: ', JSON.stringify(data));
  return true;
} catch (error) {
  console.error('addTurma :: error on save object: ', JSON.stringify(data));
  Alert.alert('Erro ao salvar a atvidaide, verifique sua concexão com a internet e tente novamente');

  //colocar a função pra deletar a atividade aqui !!!!
  return false;
}
    
}

export const addFrases = async (docAtividade, frases, entrega) => {

  const idAtvidade = docAtividade._documentPath._parts[1];
  
  const frasesData = [];


  for (let i = 0; i < frases.length; i++) {

      if(frases[i] != ""){
        frasesData.push( {frase : frases[i], 'id_Atividade': idAtvidade, entrega });
      }
    
  }

  console.log('frases push :>>><<<>>>', frasesData);
 

      while (frasesData.length) {
        await firestore()
        .collection('frases')
        .add(frasesData.shift());
        
      }

}

export const listAtividades = async referencia => {

  let querySnapshot;
  const referenciaTurma = referencia;
  querySnapshot = await firestore()
      .collection('atividade')
      .where('id_Turma','==',referenciaTurma)
      .get();

  let entries = querySnapshot.docs.map(documentSnapshot => {
    return {...documentSnapshot.data(), id: documentSnapshot.id}
  });

  console.log('LISTA ATIVIDADESSSS', entries);

  return entries;
}