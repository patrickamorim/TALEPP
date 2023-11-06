import {Alert} from 'react-native';

import moment from '../Assets/moment';

import {getUserAuth} from './Auth';

import {getUUID} from './Uuid';
import firestore,{doc} from '@react-native-firebase/firestore';

export const getAlunos = async (referenciaDoAluno) => {

  console.log('aqui no getAlunos', referenciaDoAluno);
 // const userAuth = await getUserAuth();
  let querySnapshot;
  const referencia = referenciaDoAluno;
  //let querySnapshot2;
//   console.log('getEntries :: userAUTH ', JSON.stringify(userAuth));
//   console.log('getEntries :: userAUTH ', JSON.stringify(userAuth));


      querySnapshot = await firestore()
      .collection('aluno')
      .where('id_turma','==',referencia)
      .get();

    //   querySnapshot2 = await firestore()
    //   .collectionGroup('estado')
    //  .where('nomeEstado','==','bahia')
    //   .get();

 
     // .where('userId', '==', userAuth)
      //.orderBy('entryAt')
      //.startAt(date)
    
 
    
      let entries = querySnapshot.docs.map(documentSnapshot => {
        return {...documentSnapshot.data(), id: documentSnapshot.id}
      });

      // let entries2 = querySnapshot2.docs.map(documentSnapshot => {
      //   return {...documentSnapshot.data(), id: documentSnapshot.id}
      // });
    

    
 
  console.log('getAlunos :: entries2 ', entries);

  return entries;

};

export const addAluno = async entradas => {
  // const realm = await getRealm();
   const userAuth = await getUserAuth();
   let data = {};
   const login = 
   (entradas.nomeAluno.split(' ')[0]).normalize('NFD').replace(/[\u0300-\u036f]/g, "")+
   ''+moment(entradas.nascimento).format('DDDD')+entradas.id_turma.split('')[0];
 
   console.log('entradas: ', entradas);
   try {
     data = {
          nascimento: entradas.nascimento,
          sexo: entradas.sexo,
          obs: entradas.obs,
          responsavel: entradas.responsavel,
          nomeAluno: entradas.nomeAluno,
          status: entradas.status,
          id_turma: entradas.id_turma,
          login: login.toLowerCase()
     }
 
       await firestore()
         .collection('aluno')
         .add(data);
      
 
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
         
 
 
      Alert.alert("Aluno "+entradas.nomeAluno+" salvo com sucesso !",
                   "Seu Login é: "+login
                  );
    
     console.log('addTurma :: data: ', JSON.stringify(data));
     return true;
   } catch (error) {
     console.error('addTurma :: error on save object: ', JSON.stringify(data));
     Alert.alert('Erro ao salvar a nova turma, verifique sua concexão com a internet e tente novamente');
     return false;
   }
 
   return data;
 };

 export const authAluno = async (entradas) => {
  
  
  console.log('login : ', entradas);

  querySnapshot = await firestore()
  .collection('aluno')
  .where('login','==',entradas)
  .get();

  let entries = querySnapshot.docs.map(documentSnapshot => {
    return {...documentSnapshot.data(), id: documentSnapshot.id}
  });

  return entries
 }