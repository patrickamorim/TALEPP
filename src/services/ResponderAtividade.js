import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import moment from '../Assets/moment';

import {getUserAuth} from './Auth';

import {getUUID} from './Uuid';
import firestore,{doc} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export const setTempoAtividade = async (tempo, idAluno, idAtividade) => {
  console.log(' aluno e atividade  ...', idAtividade+"/"+idAluno)
  await AsyncStorage.setItem(idAtividade+"/"+idAluno, tempo);

};
export const getTempoAtividade = async (idAluno, idAtividade) => {
 const tempo = await AsyncStorage.getItem(idAtividade+"/"+idAluno);
console.log(' get tempo   ...', tempo)
 return tempo;
};

export const ResponderAtividade = async  (Arquivo, CaminhoUp) => {

const reference = storage().ref(CaminhoUp);

const pathToFile = Arquivo;


const task = reference.putFile(pathToFile);

task.on('state_changed', taskSnapshot => {
    console.log(`${(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100} % tranferidos `);
  
});
  
  task.then(() => {
    console.log('Upload completo!');
    return "Upload completo!";
  });

  
//Alert.alert("função :", reference.toString());
}

export const SalvarAtividade = async (Palavras, Diretorio, atividade, aluno, palavrasLength, navigation) => {
  
  const jarespondeu = await jaRespondeu(atividade, aluno, navigation)
  if(jarespondeu == false){
    return false
  }else{

  //const [coontador, setCoontador] = useState(1);
  let diretorioRaizArquivos = AudioUtils.DocumentDirectoryPath;  
  let arrayPalavrasAtividade = [];
  let data = {};
  let contador = 1;
  let palavrasObject = Object.assign({}, Palavras);
 let palavras = atividade.palavras;//do teste

  Object.keys(palavras).forEach((classe) => {
  
    // novasPalavras.push(element);
      Object.keys(palavras[classe]).forEach((element) => {
       
       // if(element == "Golpe") palavras[element] = {C: "nraco top"};
     //  novasPalavras.push(element);
     // novasPalavras.push({classe: classe, palavra: element});
     arrayPalavrasAtividade.push({ resposta : {diretorio: Diretorio+'/'+element+'.aac', palavra: element, classe: classe, correcao: false, obs: ''}})
       
      })
   });



  // Object.keys(palavrasObject).forEach((element) => {  //&&&& para dar o upload completo faz um contador até chegar o número de palavras que tem no teste

    
  //   //arrayPalavrasAtividade.push([Palavras[element], Diretorio+'/'+Palavras[element]+'.aac']);
   
  //   arrayPalavrasAtividade.push({ resposta : {diretorio: Diretorio+'/'+Palavras[element]+'.aac', palavra: palavrasObject[element], correcao: false, obs: ''}});
    
 
  // });
 
  // Alert.alert('Fazendo upload', 'coontador'+' de'+ palavrasLength);



   Object.keys(arrayPalavrasAtividade).forEach((element)  => {

    const reference = storage().ref(arrayPalavrasAtividade[element].resposta.diretorio);

    const pathToFile = diretorioRaizArquivos+'/'+arrayPalavrasAtividade[element].resposta.diretorio;
    
    const task = reference.putFile(pathToFile);

    task.on('state_changed', taskSnapshot => {
      console.log(`${(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100} % tranferidos `);
    
   
    });
    
    task.then(() => {
      
      
      console.log('Upload sendo realizado!', contador+' de '+ palavrasLength);
      contador++;
     // setCoontador(coontador+1)
      //return 'success';

      if(contador == palavrasLength){

          SalvarAtividadeBanco(Palavras, atividade, aluno, arrayPalavrasAtividade, navigation);
          
      }
    });

  });
}
}

const SalvarAtividadeBanco = async (Palavras, atividade, aluno, arrayPalavrasAtividade, navigation) => {

  let diretorioRaizArquivos = AudioUtils.DocumentDirectoryPath;  
  let arrayPalavrasAtividades = arrayPalavrasAtividade;
  let data = {};
  let contador = 1;
  let palavrasObject = Object.assign({}, Palavras);
  let palavras = atividade.palavras;//do teste
  let TempoRespostas = await getTempoAtividade(atividade.id, aluno.id)
 
try {

  data = {
    // id: '',
    id_atividade: atividade.id,
    id_aluno: aluno.id,
    id_turma: atividade.Id_turma,
    modeloTeste: atividade.modeloTeste,
    data: new Date(),
    corrigido: false,
    aluno: aluno.nomeAluno,
    palavras: arrayPalavrasAtividades,
    tempoDoTeste: TempoRespostas
    
  }

    await firestore()
    .collection('resposta')
    .add(data);

} catch (error) {
  navigation.goBack();
  Alert.alert("Erro ao enviar a sua resposta !","verfique sua conexão com a internet e tente novamente!")
  console.log(arrayPalavrasAtividade);
  return 'error';
}
  console.log('sucesso dentro do enviar')
  navigation.goBack();
  Alert.alert("Respostas Enviadas com Sucesso !!!")
  return 'success';
  
}

export const jaRespondeu = async (atividade, aluno, navigation) => {

  let querySnapshot;

  querySnapshot =  await firestore()
  .collection('resposta')
  .where('id_atividade','==',atividade.id)
  .where('id_turma','==',atividade.Id_turma)
  .where('id_aluno','==',aluno.id)
  .get()


  let entries = querySnapshot.docs.map(documentSnapshot => {
    return {...documentSnapshot.data(), id: documentSnapshot.id}
  });

  if(entries != ''){
    console.log('ENTRIIIIEESSSSS', entries)
  navigation.goBack();
  Alert.alert("Essa atividade já foi respondida")
  return false
}else{
  return true
}

};