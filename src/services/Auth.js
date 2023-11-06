import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import {authAluno} from './Alunos';

export const isLogged = async () => {
    const userAuth = await AsyncStorage.getItem("userAuth");
    console.log('isLogged : ',userAuth);
    return userAuth !== null ;
};

export const setUsearAuth = async (uid) => {
     await AsyncStorage.setItem("userAuth", uid);

};
export const getUserAuth = async () => {
    const userAuth = await AsyncStorage.getItem("userAuth");

    return userAuth;
};

export const cleanUserAuth = async () => {
    await AsyncStorage.removeItem("userAuth");
};

export const SignUp = async (data) => {
    const {email, password, nome} = data

    try {
        const userInfos = await auth().createUserWithEmailAndPassword(
            email,
            password,
        );
        
        
        await firestore()
        .collection('professor')
        .doc(userInfos.user.uid)
        .set({
            nome: nome,
        })

        setUsearAuth(userInfos.user.uid);
        return {signUpSuccess: true}
    } catch (e) {
        if(e.code == 'auth/email-already-in-use'){
        Alert.alert('Esse e-mail já esta sendo usado por um usuário!');
        }
        else if(e.code == 'auth/weak-password'){
            Alert.alert('A senha precisa ter pelo menos 6 caracteres!');
        }
        else if(e.code == 'auth/invalid-email'){
            Alert.alert('Digite um e-mail válido!',);
        }
        else{
            Alert.alert('Erro ao logar, tente novamente!');
        }
        return {signUpSuccess: false}
    }

}

export const signIn = async   (data) =>{
    const {email, password} = data;

    try {
        const userInfos = await auth().signInWithEmailAndPassword(
            email,
            password,
        );

       console.log(' user infos', userInfos.user.uid);
        setUsearAuth(userInfos.user.uid);
        return {loginSuccess: true}

    } catch (e) {
        Alert.alert('Erro ao tentar logar'), e.message;
        return {loginSuccess: false}
    }
}

export const signInAluno = async (data) => {
        const login = data;

        try {
            const userInfos = await authAluno(
                login.toLowerCase()
            );

            console.log(' user infos', userInfos);
            if(userInfos != []){
                console.log(' user infos OK', userInfos[0].login);
                //setUsearAuth(userInfos[0].login);

                let infos = userInfos[0];
                return ({loginSuccess: true, infos})

            }else{
                Alert.alert('Nenhum Aluno com esse login encontrado');
                 return {loginSuccess: false}
            }
    
         
    
        } catch (e) {
            Alert.alert('Erro ao tentar logar'), e.message;
            return {loginSuccess: false}
        }

}