import {Alert} from 'react-native';

import moment from '../Assets/moment';
import _, { union } from 'lodash';
import {getUserAuth} from './Auth';

import {getUUID} from './Uuid';
import firestore,{doc} from '@react-native-firebase/firestore';

function somatoriaDaCorrecao(entries) {
  const grupos = {};
  const time = {};
  const array = [];
  let groupby = [];
  let groupby2 = [];
  let groupby3 = [];
  let cont_p = 1;
  let cont_pp = 1;
 
  Object.keys(entries).forEach((classe) => {
     groupby.push(entries[classe].palavras);
  });

  groupby.forEach(function(nome, i) {
    nome.forEach(function(nomes, is) {
      groupby2.push(nomes)
    })
  })
  
  groupby2.forEach(function(nome, i) {
    groupby3.push(nome.resposta);
  });

  console.log('GROUPPPP, ', entries)
  // agrupa por classe e instacia os objetos true e false
  groupby3.forEach(objeto => {
    const classe = objeto.classe;
    if (!grupos[classe]) {
      grupos[classe] = {
        classe: classe,
        erradas: [],
        true: 0,
        false: 0
      };
    }
    
    if (objeto.correcao === true) {
      grupos[classe].true++;
    } else {
      grupos[classe].false++;
    }
    if(objeto.correcao === false && !grupos[classe].erradas.some(p => p == objeto.palavra)){
      grupos[classe].erradas.push(objeto.palavra);
    }
  });

  Object.keys(grupos).forEach((classe) => {
    console.log(grupos[classe]);
    array.push(grupos[classe]);
 });


   //agrupa os tempos para fazer amédia de tempo
  entries.forEach(objeto => {
    let tempoTemp =  parseFloat(objeto.tempoDoTeste);
    const modelo = objeto.modeloTeste;
    if (!time[modelo]) {
      time[modelo] = {
        modelo: modelo,
        tempoMedio: 0,
      };
    }

    if(time[modelo].modelo == "Leitura_PP"){
      time[modelo].tempoMedio = (time[modelo].tempoMedio+tempoTemp)/cont_pp;
       cont_pp++;
    }
    if(time[modelo].modelo == "Leitura_P"){
      time[modelo].tempoMedio = (time[modelo].tempoMedio+tempoTemp)/cont_p;
      cont_p++;
   }

  });

  let array2 = [];
  array2.push(time);
  array2.push(array);
  console.log('>>>',array2);
  return array2;
}

export const estatistica = async (turma = 1, aluno = 1, atividade = 1) => {
console.log(turma)
   // let queryTurma =  firestore().collection('resposta');
    let querySnapshot;
    let usuarioProfessor = await getUserAuth();
    var somatorioPseudoPalavras = 0;
    var tempoMedioPseudoPalavras = 0;
    var somatorioPalavras = 0;
    var tempoMedioPalavras = 0;

   
    if(turma == 1 && aluno == 1 && atividade == 1){
      querySnapshot = await firestore()
          .collection('resposta')
          .where('corrigido','==',true)
          .get();

    }

    if(turma != 1  && aluno == 1 && atividade == 1){

       querySnapshot = await firestore()
        .collection('resposta')
        .where('id_turma','==',turma)
        .where('corrigido','==',true)
        .get();
    }
   
    if(turma == 1  && aluno != 1 && atividade == 1){

      querySnapshot = await firestore()
       .collection('resposta')
       .where('id_aluno','==',aluno)
       .where('corrigido','==',true)
       .get();
    }

    if(turma == 1  && aluno == 1 && atividade != 1){

      querySnapshot = await firestore()
       .collection('resposta')
       .where('id_atividade','==',atividade)
       .where('corrigido','==',true)
       .get();
    }

    if(turma != 1  && aluno != 1 && atividade == 1){

      querySnapshot = await firestore()
       .collection('resposta')
       .where('id_turma','==',turma)
       .where('id_aluno','==',aluno)
       .where('corrigido','==',true)
       .get();
   }
  
   if(turma != 1  && aluno == 1 && atividade != 1){

     querySnapshot = await firestore()
      .collection('resposta')
      .where('id_turma','==',turma)
      .where('id_atividade','==',atividade)
      .where('corrigido','==',true)
      .get();
   }

   if(turma == 1  && aluno != 1 && atividade != 1){

     querySnapshot = await firestore()
      .collection('resposta')
      .where('id_aluno','==',aluno)
      .where('id_atividade','==',atividade)
      .where('corrigido','==',true)
      .get();
   }

   if(turma != 1  && aluno != 1 && atividade != 1){

     querySnapshot = await firestore()
      .collection('resposta')
      .where('id_turma','==',turma)
      .where('id_aluno','==',aluno)
      .where('id_atividade','==',atividade)
      .where('corrigido','==',true)
      .get();
   }

console.log('entrou turma', turma)
    let entries = querySnapshot.docs.map(documentSnapshot => {
      return {...documentSnapshot.data(), id: documentSnapshot.id}
    });
 
    if(entries == ''){
      return false;
    }
    
    const somatorio = somatoriaDaCorrecao(entries);
    console.log('SOMATOOOOORIIOOOOO   ', somatorio)

    
    if(somatorio[1].find( pseudoPalavras  =>(pseudoPalavras.classe.charAt(1) == "_")) != undefined){
    somatorioPseudoPalavras = somatorio[1].filter( pseudoPalavras  =>(pseudoPalavras.classe.charAt(1) == "_"));
    tempoMedioPseudoPalavras = somatorio[0].Leitura_PP.tempoMedio;
    }
    if(somatorio[1].find( palavras  =>(palavras.classe.charAt(1) == "a")) != undefined){
    somatorioPalavras = somatorio[1].filter( palavras  =>(palavras.classe.charAt(1) == "a"));
    tempoMedioPalavras = somatorio[0].Leitura_P.tempoMedio;
    }
    let resultado = {somatorioPalavras,somatorioPseudoPalavras, tempoMedioPseudoPalavras,tempoMedioPalavras}
    console.log('resultado',somatorio);
    
return resultado;

}

export const carregarTurmasFiltro = async (turmas = null) => {

  const userAuth = await getUserAuth();
  let querySnapshot;

  querySnapshot = await firestore()
      .collection('turma')
     // .where('id_professor','==',userAuth)
      .get();
 
    
      let entries = querySnapshot.docs.map(documentSnapshot => {
        return {...documentSnapshot.data(), id: documentSnapshot.id}
      });

      console.log('turmas:   ', entries);

      return entries;
}
export const carregarAtividadesFiltro = async (turmaId = null) => {

  let querySnapshot;

  if(turmaId != 1){
  querySnapshot = await firestore()
      .collection('teste')
      .where('Id_turma','==',turmaId)
      .get();
  }

  if(turmaId == 1){
    querySnapshot = await firestore()
        .collection('teste')
       // .where('Id_turma','==',turmaId)
        .get();
    }
    
      let entries = querySnapshot.docs.map(documentSnapshot => {
        return {...documentSnapshot.data(), id: documentSnapshot.id}
      });

      console.log('testes:   ', entries);

      return entries;
}
export const carregarAlunosFiltro = async (turmaId = null, AtividadeId = null) => {

  let querySnapshot;
  let entries;
  let entries2;

 // console.log('turma :', turmaId, 'atividade: ',AtividadeId)

  if((AtividadeId == 1) && turmaId != 1) {
  querySnapshot = await firestore()
      .collection('aluno')
      .where('id_turma','==',turmaId)
      .get();

        entries = querySnapshot.docs.map(documentSnapshot => {
        return {...documentSnapshot.data(), id: documentSnapshot.id}
      });
  }

  if((AtividadeId == 1) && turmaId == 1) {
  querySnapshot = await firestore()
      .collection('aluno')
     // .where('id_turma','==',turmaId)
      .get();

        entries = querySnapshot.docs.map(documentSnapshot => {
        return {...documentSnapshot.data(), id: documentSnapshot.id}
      });
  }

  
  if(AtividadeId != 1){

    querySnapshot = await firestore()
    .collection('resposta')
    .where('id_atividade','==',AtividadeId)
    .get();

      entries2 = querySnapshot.docs.map(documentSnapshot => {
        return {...documentSnapshot.data(), id: documentSnapshot.id}
      });

       entries = [];

    Object.keys(entries2).forEach(key => {
      
       entries = _.union(entries, [{id: entries2[key].id_aluno, nomeAluno: entries2[key].aluno}]);
      //  entries.push({id: entries2[key].id_aluno, nomeAluno: entries2[key].aluno});
     });
  }

     

     // console.log('alunos:   ', entries);

      return entries;
}

export const titulosEstatistica = async (turma = 1, aluno = 1, atividade = 1) => {
  console.log(turma)
     // let queryTurma =  firestore().collection('resposta');
      let querySnapshot;
      let querySnapshot2;
      let querySnapshot3;
      let entries = 'Todas';
      let entries2 = 'Todos';
      let entries3 = 'Todas';
  
     
      if(atividade != 1){
        querySnapshot = await firestore()
            .collection('teste')
            .doc(atividade)
            .get();
        
        entries = querySnapshot.data().titulo;
      }
      if(aluno != 1){
        querySnapshot2 = await firestore()
            .collection('aluno')
            .doc(aluno)
            .get();

        entries2 = querySnapshot2.data().nomeAluno;
      }
      if(turma != 1){
        querySnapshot3 = await firestore()
            .collection('turma')
            .doc(turma)
            .get();

        entries3 = querySnapshot3.data().serieTurmaAno;
      }

      let resultado =  {turma: entries3, aluno: entries2, atividade: entries};

      console.log('TUREMA ALUNO ATIVIDADE',resultado);
  
      
  return resultado;
    }  