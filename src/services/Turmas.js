import {Alert} from 'react-native';

import moment from '../Assets/moment';

import {getUserAuth} from './Auth';

import {getUUID} from './Uuid';
import firestore,{doc} from '@react-native-firebase/firestore';

export const getTurmas = async () => {

  console.log('aqui no geturmas');
  const userAuth = await getUserAuth();
  let querySnapshot;
  let querySnapshot2;
  console.log('getEntries :: userAUTH ', JSON.stringify(userAuth));
  console.log('getEntries :: userAUTH ', JSON.stringify(userAuth));

    
 
 
 

      querySnapshot = await firestore()
      .collection('turma')
      .where('id_professor','==',userAuth)
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
    

    
 
  console.log('getEntries :: entries2 ', entries);

  return entries;

};

export const addTurma = async entradas => {
 // const realm = await getRealm();
  const userAuth = await getUserAuth();
  let data = {};

  console.log('entradas: ', entradas);
  try {
    data = {
          escola: entradas.escola,
          serieTurmaAno: entradas.serieTurmaAno,
          obs: entradas.obs,
          abertura: entradas.abertura,
          encerramento: entradas.encerramento,
          status: "aberta",
          id_professor: userAuth
    }

      await firestore()
        .collection('turma')
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
        


      Alert.alert('Turma '+data.serieTurmaAno+' salva com sucesso!');
    console.log('addTurma :: data: ', JSON.stringify(data));
    return true;
  } catch (error) {
   // console.error('addTurma :: error on save object: ', JSON.stringify(data));
    Alert.alert('Erro ao salvar a nova turma, verifique sua concexão com a internet e tente novamente');
    return false;
  }

  return data;
};

export const updateEntry = async entry => {
   const userAuth = await getUserAuth();

    let data = {};
    try {
      data = {
        amount: entry.amount,
        entryAt: entry.entryAt || new Date(),
        description: entry.category.name,
        photo: entry.photo,
        address: entry.address,
        latitude: entry.latitude,
        longitude: entry.longitude,
        isInit: entry.isInit || false,
        category: entry.category,
        userId: userAuth,
      };

      await firestore()
        .collection('Turma')
        .doc(entry.id)
        .update(data);    

      } catch (error) {
        console.log('updateEntry erro = ', JSON.stringify(data));
        console.log('entry id = ', entry.id);
         Alert.alert('Erro','Houve um erro ao atualizar esse lançamento'); 
      }

      return data;

};

export const deleteEntry = async entry => {
  

  try {
    await firestore()
    .collection('Turma')
    .doc(entry.id)
    .delete(); 

  } catch (error) {
    console.error(
      'deleteEntry :: error on delete object: ',
      JSON.stringify(entry),
    );
    Alert.alert('Erro ao excluir este lançamento.');
  }
};

export const getTurmaInfos = async (id_turma) => {

  console.log('aqui no geturmas');
  const userAuth = await getUserAuth();
  let querySnapshot;
 
  console.log('getEntries :: userAUTH ', JSON.stringify(userAuth));
  

      querySnapshot = await firestore()
      .collection('turma')
      .where('id','==',id_turma)
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
    

    
 
  console.log('getEntries :: entries2 ', entries);

  return entries;

};