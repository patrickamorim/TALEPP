
import firestore from '@react-native-firebase/firestore';
import {getUserAuth} from './Auth';

export const isInitialized = async () => {
    const userAuth = await getUserAuth();
    let openingBalance = false;

    if(userAuth){
        const userInfos = await firestore()
        .collection('users')
        .doc(userAuth)
        .get();
        openingBalance = userInfos.data().openingBalance;
    }

    return openingBalance !== null && openingBalance === true;
};

export const setInitialized = async () => {
    const userAuth = await getUserAuth();
     await firestore()
     .collection('users')
     .doc(userAuth)
     .set({
         openingBalance: true,
     },
     {
         merge: true, //serve pra não apagar o resto que ta no firebase
     }
     );
};

export const cleanInitialazed = async () => {
    const userAuth = await getUserAuth();
     await firestore()
     .collection('users')
     .doc(userAuth)
     .set({
         openingBalance: false,
     },
     {
         merge: true, //serve pra não apagar o resto que ta no firebase
     }
     );
     
    }