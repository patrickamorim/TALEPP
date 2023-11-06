import {Alert} from 'react-native';

import moment from '../Assets/moment';

import {getUserAuth} from './Auth';

import {getUUID} from './Uuid';
import firestore,{doc} from '@react-native-firebase/firestore';

export const getEscolas = async () => {

  const escolasAPI = '';
  console.log('aqui no geescolas');
  const userAuth = await getUserAuth();
  let querySnapshot;
  console.log('getEntries :: userAUTH ', JSON.stringify(userAuth));


    //   querySnapshot = await firestore()
    //   .collection('escola')
    //  // .where('id_professor.professor.uid','==',userAuth)
    //   .get();
  
      // let entradas = querySnapshot.docs.map(documentSnapshot => {
      //   return {...documentSnapshot.data(), id: documentSnapshot.id}
      // });
    
      const BuscaEscolaApi = async () => {
        const xhr = new XMLHttpRequest();

      xhr.open("GET", "http://educacao.dadosabertosbr.com/api/escolas?nome=davina%20lins");
      xhr.send(null)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          const res = JSON.parse(xhr.responseText);
          console.log('get das eslcoas', res);
        }
      };
      }
      
      entradas = await  BuscaEscolaApi();
      console.log('escolas reponse teste', entradas);
     

  return entradas;

};
export const getEscolass = async () => {

  var xhr = new XMLHttpRequest();

        xhr.open("GET", "https://api.github.com/users/felipefontoura");
        xhr.send(null);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            var res = JSON.parse(xhr.responseText);

            const entradas = res;

           
          }
        };
        conlog.log(res)

  return entradas;

};

