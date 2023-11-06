
const porcentagem = (stringBase, palavrasCorretas) => {
  stringBase = stringBase.length;
  palavrasCorretas =  palavrasCorretas.length;

  return ((palavrasCorretas/stringBase)*100).toFixed(1);
};

const palavrasCorretas  = (textoFalado,textoBase) => {

  pCorretas = [];

  for(i = 0; i < textoBase.length; i++){
    if(textoFalado[i].includes(textoBase[i])){
      textoFalado[i] = textoBase[i];
      pCorretas.push(textoFalado[i]);
    }else if(textoBase[i].includes(textoFalado[i])){
      textoBase[i] = textoFalado[i];
      pCorretas.push(textoBase[i]);
    }

  } 

  return pCorretas;
};

const palavrasErradas  = (textoFalado,textoBase) => {

  pErradas = [];

  for(i = 0; i < textoBase.length; i++){
    console.log(textoFalado[i], '',textoBase[i]);
    if(!textoFalado[i].includes(textoBase[i]) && !textoBase[i].includes(textoFalado[i])){
   
      pErradas.push(textoBase[i]);
    }
  } 

  return pErradas;
};

const letrasErradas = (palavrasErradas) => {

  lErradas = [];
  
  for (i = 0; i < palavrasErradas.length; i++) {
      for(j = 0; j < palavrasErradas[i].length; j++){
        lErradas.push(palavrasErradas[i][j]);
      }
  }

  lErradas = new Set(lErradas);
  return lErradas;
};

export const compararTexto = (textoFalado, separador, textoBase) => {

  var resultados = [{
    pCorretas: [],
    pErradas: [],
    letrasErradas: [],
    porcentagemAcerto: 0,

  }];
  // textoBase = textoBase.toLowerCase();
  // textoFalado = textoFalado.toLowerCase();


  var palavrasIguais = 0;

  textoBase = splitString(textoBase,separador);
  textoFalado = splitString(textoFalado,separador);
  
  

    if(textoBase.length != textoFalado.length){
      return 'número de palavras diferente, tente de novo';
    } else {

      resultados.pCorretas = [...palavrasCorretas(textoFalado,textoBase)];
      resultados.pErradas = [...palavrasErradas(textoFalado,textoBase)];
      resultados.letrasErradas = [...letrasErradas(pErradas)];
      resultados.porcentagemAcerto = [porcentagem(textoBase,resultados.pCorretas)];

      for(i = 0; i < textoBase.length; i++)
        if(textoFalado[i].includes(textoBase[i])){
          palavrasIguais++;
          textoFalado[i] = textoBase[i];
        }
        console.log( 'resultados.pcorrestas', resultados.pCorretas);
        console.log( 'resultados.pErradas', resultados.pErradas);
        console.log( 'resultados.letrasErradas', resultados.letrasErradas);
        console.log( 'resultados.porcentagemAcert', resultados.porcentagemAcerto);

        return 'Acertou '+resultados.porcentagemAcerto+'% \n '+ textoFalado ;
      }





};





  export const splitString = (texto, separador) => {
  
    texto = texto.toLowerCase();
    
    var arrayTexto = texto.split(separador);

    console.log('splitstring : ',arrayTexto);
    return arrayTexto;

  };

  export const getAllCategories = async () => {
    const realm = await getRealm();
    return realm.objects('Category').sorted('order');
  };