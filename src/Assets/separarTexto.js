
  
  export const dividirEmFrases = async (textoBase, separador) => {
    var  frases =[];
   
     const textoLimpo = textoBase.replace(/\ {2,}|\f|\n|\r|\t|\v/g,' ');
   
    console.log('trim  >',textoLimpo);
    return  frases = await splitString(textoLimpo,separador);
 

  };
  
  
  
  
  
    export const splitString =  async (texto, separador) => {
    
     // texto = texto.toLowerCase();
      const ArrayElement = [];
      var arrayTexto = texto.split(separador);
  
      
      for (let index = 0; index < arrayTexto.length; index++) {
        
        ArrayElement.push(arrayTexto[index].replace(/^\s{1,}|\s{1,}$/g,''));
  
      }
      console.log('splitstring element: ',ArrayElement);
      return ArrayElement;
  
    };
  
    export const normalizarFrase = async (textoBase) => {
      
     
       const textoLimpo = textoBase.replace(/\ {2,}|\f|\n|\r|\t|\v/g,' ');
     
     
      return  textoLimpo;
   
  
    };