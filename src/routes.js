import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {isLogged, getUserAuth} from './services/Auth';

import SignIn_aluno from './pages/SignIn_aluno'; 
import SignIn_professor from './pages/SignIn_professor'; 
import SignUp_professor from './pages/SignUp_professor'; './pages/SignUp_professor'; 
import MinhasTurmas from './pages/MinhasTurmas';
import AlunosTurma from './pages/AlunosTurma';
import NovaTurma from './pages/NovaTurma';
import NovoAluno from './pages/NovoAluno';
import AtividadesProfessor from './pages/AtividadesProfessor';
import NovaAtividade from './pages/NovaAtividade';
import App from './pages/Responder_Atividade/App2';
import Responder_Atividade from './pages/Responder_Atividade/index';
import CorrigirAtividades from './pages/CorrigirAtividades';
import AtividadesAluno from './pages/AtividadesAluno';
import Estatistica from './pages/Estatisticas';


const Stack = createNativeStackNavigator();

const StackScreens = ({logged, initiated}) => {

  return (
    <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={logged == true? "MinhasTurmas" : "SignIn_aluno"}>

<Stack.Screen name="SignIn_aluno" component={SignIn_aluno} />
<Stack.Screen name="SignIn_professor" component={SignIn_professor} />
<Stack.Screen name="SignUp_professor" component={SignUp_professor} />
<Stack.Screen name="MinhasTurmas" component={MinhasTurmas} />
<Stack.Screen name="AlunosTurma" component={AlunosTurma} />
<Stack.Screen name="NovaTurma" component={NovaTurma} />
<Stack.Screen name="NovoAluno" component={NovoAluno} />
<Stack.Screen name="AtividadesProfessor" component={AtividadesProfessor} />
<Stack.Screen name="NovaAtividade" component={NovaAtividade} />
<Stack.Screen name="App" component={App} />
<Stack.Screen name="Responder_Atividade" component={Responder_Atividade} />
<Stack.Screen name="CorrigirAtividades" component={CorrigirAtividades} />
<Stack.Screen name="AtividadesAluno" component={AtividadesAluno} />
<Stack.Screen name="Estatisticas" component={Estatistica} />
      
    </Stack.Navigator>
  );
}


const Routes = () => {

  const [initiated, setInitiated] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(async () => {
    async function initialVerifications() {

      
      setLogged(await isLogged());
      
       

        console.log('loged?',logged);
    
  }

  initialVerifications();
 
})

  
    return (
       
       <NavigationContainer>
           <StackScreens logged={logged} initiated={initiated}/>
       </NavigationContainer>
        
    );
};

export default Routes;
