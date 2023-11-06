import {Alert} from 'react-native';

import moment from '../Assets/moment';

import {getUserAuth} from './Auth';

import {getUUID} from './Uuid';
import firestore,{doc} from '@react-native-firebase/firestore';



export const addTeste = async (entradas) => {

  let data = {};
  
    try {
        data = {
            titulo: entradas.titulo,
            Versao_teste: entradas.TesteTemp.Versao_teste,
            modeloTeste: entradas.modeloTeste,
            Data_Entrega: entradas.entrega,
            dataCriacao: entradas.data,
            Id_turma: entradas.id_turma,
            status: entradas.status,
            palavras: entradas.TesteTemp.palavras,
        }
      
          const atividadeCriada = await firestore()
            .collection('teste')
            .add(data);
          
         Alert.alert("teste salvo com sucesso !",);
      
        return true;
    } catch (error) {
        Alert.alert('Erro ao salvar o teste, verifique sua'+ 
        'concexão com a internet e tente novamente');
        return false;
    }
}

export const getTesteTemp =  (modeloTeste) => {
  
  let data = {Versao_tete: 0, palavras: {}};
  // const data = {Versao_teste: 1,
   
  //   Palavras_CV:  {Gato: {}, Bola: {}, Lata: {}, Vale: {}, Cola: {}, Sapo: {}, Casa: {}},
  //   Palavras_VC: {Escola: {}, Árvore: {}, Alvo: {}, Armário: {}, Arma: {}, Urso: {}, Arte: {}},
  //   Palavras_CCV: {Prato: {}, Braço: {}, Glicose: {}, Clara: {}, Dragão: {}, Tigre: {}, Clima: {}},
  //   Palavras_CVV: {Feito: {}, Coisa: {}, Boi: {}, Cuidado: {}, Moeda: {}, Saúde: {}, Leite: {}},
  //   Palavras_CVC: {Borboleta: {}, Porta: {}, Corda: {}, Bolsa: {}, Caldo: {}, Golpe: {}, Barba: {}},
  //   Palavras_CCVC: {Prestígio: {}, Trânsito: {}, Brinca: {}, Grande: {}, Planta: {}, Branco: {}, Princesa: {}},
  //   Palavras_CVVC: {Guarda: {}, Qual: {}, Quente: {}, Quarto: {}, Guardanapo: {}, Doença: {}, Quantidade: {}}
  //   };

  if(modeloTeste == 'Leitura_P'){
  data = {Versao_teste: 2,
   
      palavras: {
      palavras_CV:  {Gato: {}, Bola: {}, Lata: {}, Vale: {}, Cola: {}, Sapo: {}, Casa: {}},
      palavras_VC: {Escola: {}, Árvore: {}, Alvo: {}, Armário: {}, Arma: {}, Urso: {}, Arte: {}},
      palavras_CCV: {Prato: {}, Braço: {}, Glicose: {}, Clara: {}, Dragão: {}, Tigre: {}, Clima: {}},
      palavras_CVV: {Feito: {}, Coisa: {}, Boi: {}, Cuidado: {}, Moeda: {}, Saúde: {}, Leite: {}},
      palavras_CVC: {Borboleta: {}, Porta: {}, Corda: {}, Bolsa: {}, Caldo: {}, Golpe: {}, Barba: {}},
      palavras_CCVC: {Prestígio: {}, Trânsito: {}, Brinca: {}, Grande: {}, Planta: {}, Branco: {}, Princesa: {}},
      palavras_CVVC: {Guarda: {}, Qual: {}, Quente: {}, Quarto: {}, Guardanapo: {}, Doença: {}, Quantidade: {}}
      }
    };
  }else if(modeloTeste == 'Leitura_PP'){
    data = {Versao_teste: 2,
   
      palavras: {
      p_palavras_CV:  {Gatho: {}, Bona: {}, Lala: {}, Vate: {}, Coja: {}, Sajo: {}, Cata: {}},
      p_palavras_VC: {Escota: {}, Árvore: {}, Alfo: {}, Armário: {}, Arma: {}, Urto: {}, Arfe: {}},
      p_palavras_CCV: {Prako: {}, Brapo: {}, Glicofe: {}, Claba: {}, Dratão: {}, Tibre: {}, Clima: {}},
      p_palavras_CVV: {Feilo: {}, Coida: {}, Bai: {}, Cuidado: {}, Moeda: {}, Saúde: {}, Leife: {}},
      p_palavras_CVC: {Bortolefa: {}, Porla: {}, Corma: {}, Bolta: {}, Calbo: {}, Golje: {}, Barta: {}},
      p_palavras_CCVC: {Prestíbio: {}, Trântito: {}, Brinfa: {}, Granze: {}, Planla: {}, Branto: {}, Prinlesa: {}},
      p_palavras_CVVC: {Guarta: {}, Quel: {}, Quenfe: {}, Quarpo: {}, Guardanaco: {}, Doenço: {}, Quantitade: {}}
      }
    };
  }
console.log('modelo do teste >>>>', data)
return data;
}

export const listarTestes = async referencia => {

  let querySnapshot;
  const referenciaTurma = referencia;
  querySnapshot = await firestore()
      .collection('teste')
      .where('Id_turma','==',referenciaTurma)
      .get();

  let entries = querySnapshot.docs.map(documentSnapshot => {
    return {...documentSnapshot.data(), id: documentSnapshot.id}
  });

  console.log('turma', referenciaTurma);
  console.log('LISTA ATIVIDADESSSS', entries);

  return entries;
}


export const getPalavrasTeste = async (atividade) => {

  let novasPalavras = [];
  let palavras = atividade.palavras;
  let teste;

  let arrayPalavrasAtividade = [];
  let palavrasObject = Object.assign({}, palavras);
 

  Object.keys(palavras).forEach((classe) => {
  
  // novasPalavras.push(element);
    Object.keys(palavras[classe]).forEach((element) => {
     
     // if(element == "Golpe") palavras[element] = {C: "nraco top"};
     novasPalavras.push(element);
 
    })
 });


 console.log('foreach >:',novasPalavras)
 return novasPalavras;
}

export const getRespostas = async referencia => {

  let querySnapshot;
  const referenciaTurma = referencia;
  querySnapshot = await firestore()
      .collection('resposta')
      .where('id_atividade','==',referenciaTurma)
      .get();

  let entries = querySnapshot.docs.map(documentSnapshot => {
    return {...documentSnapshot.data(), id: documentSnapshot.id}
  });

  console.log('turma', referenciaTurma);
  console.log('LISTA respostas', entries);

  return entries;
}

export const corrigir = async (palavrasCorrigidas, resposta) => {

let data = {};

try {
  data = {
    id_atividade: resposta.id_atividade,
    id_aluno: resposta.id_aluno,
    id_turma: resposta.id_turma,
    data: resposta.data,
    corrigido: true,
    aluno: resposta.aluno,
    palavras: palavrasCorrigidas
     
  }

    const atividadeCriada = await firestore()
      .collection('resposta')
      .doc(resposta.id)
      .update(data);
   
    
   Alert.alert("Resposta do aluno: "+resposta.aluno+" corrigida com sucesso",
               );
 
  console.log('correção:: data: ', JSON.stringify(data));
  return true;
} catch (error) {
  console.error('correção:: error on save object: ', JSON.stringify(resposta.id));
  Alert.alert('Erro ao salvar a correção, verifique sua concexão com a internet e tente novamente');


  return false;
}


};