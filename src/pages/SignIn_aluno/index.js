import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import Tts from 'react-native-tts';
import Colors from '../../Styles/Colors';
import speech from '../../Assets/textToSpeech';
import {RFValue} from 'react-native-responsive-fontsize'
import {signInAluno as loginAluno, getUserAuth, isLogged} from '../../services/Auth';

const SignIn_aluno = ({navigation}) => {

    const [login, setLogin] = useState('');
    const [help, setHelp] = useState('escreva o login que a professora lhe deu e aperte no botão verde !')
    const [bemVindo, setBemVindo] = useState('Olá !')
    const [erroLogin, setErroLogin] = useState('Tente novamente, talvez você tenha errado algum número ou letra !')
    const [loading, setLoading] = useState(false);

    useEffect(async ()=> {

        if(await isLogged()){
            navigation.navigate('MinhasTurmas');
        }

    }, [])

    const ajudaEmVoz = () =>{
      speech(help);
    }

    const onSubmit = async () => {
        if (loading === false && login != ''){
            setLoading(true);
            const {loginSuccess, infos} = await loginAluno(
                login
            );
            if (loginSuccess === true){
                // const initiated = true /*await isInitialized()*/;
                // navigation.reset({
                //     index: 0,
                //     key: null,
                //     routes: [{name: initiated? 'MinhasTurmas' : 'BemVindoProfessor' }]
                // });
                console.log('TO LOGADO', await getUserAuth());
                // console.log(infos.nomeAluno)
                setLoading(false);
                setHelp(erroLogin);
                speech("Seja bem vindo "+infos.nomeAluno);
                navigation.navigate('AtividadesAluno', {infos});
            } else {
               
                setLoading(false);
                setHelp(erroLogin);
                speech(erroLogin);
            }
        }else {
            alert('insira os dados para entrar na área do aluno !')
        }

    }

    return (
        <View style={styles.container}>
           
           <ImageBackground
            source={require('../../Assets/imagens/background1.png')}
            style={styles.background}
            >

            <View style={styles.cabecalho}>
                    <TouchableOpacity 
                    style={styles.botaoCabecalho}
                    onPress={() => navigation.navigate('SignIn_professor')}
                    
                    >
                        <Text style={styles.textoBotaoCabecalho}>Área do Professor</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.card}> 
                <Text style={styles.titulo}>Área do Aluno</Text>
                <View><Text style={styles.label}>Login:</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    value={login}
                    onChangeText={(text) => {
                        setLogin(text);
                    }}
                />
            
                <View style={styles.cardButtons}>
                    <TouchableOpacity style={styles.botaoConfirmar}
                    onPress={() => onSubmit()}
                    >
                        <Text style={styles.textoBotao}> {loading ? 'carregando ...' : 'Entrar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoHelp}
                        onPress={() => ajudaEmVoz()}
                    >
                        <Text style={styles.textoBotao}>Ajuda</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </View>
    )
}

export default SignIn_aluno

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Fundo,
        //justifyContent: 'center'
    },
    card: {
        flex: 0.8,
        marginTop: 50,
       // backgroundColor: 'white',
        width: "80%",
       // alignItems: 'center',
       justifyContent: 'center',
        alignSelf: 'center'
        
    },
    background:{
        flex: 1,
        resizeMode: 'cover',
        width:'100%'
      },
    cardButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        alignSelf: 'center'
      
    },
    titulo: {
        color: Colors.botaoEscuro,
          marginBottom: 35,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        color: 'black',
        fontSize: 22,
        width: '80%',
        alignSelf: 'center', 
    },
    botaoConfirmar: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 90,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
    },
    botaoHelp: {
        backgroundColor: Colors.help,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 90,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
    },
    botaoCabecalho: {
        backgroundColor: Colors.BotaoClaro,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: '50%',
        height: 26,
        borderWidth: 1,
        borderRadius: 5
    },
    cabecalho: {
        //backgroundColor: Colors.BotaoClaro,
       // flex: 0.1,
        alignItems: 'flex-end',
        margin: 4
    },
    textoBotao: {
        color: Colors.textoBranco,
        fontSize: RFValue(22)
    },
    textoBotaoCabecalho: {
        color: Colors.textoBranco,
        fontSize: RFValue(18),
      
    },
    textInput: {
        backgroundColor: 'white',
        width: '80%',
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        alignSelf: 'center',
        fontSize: RFValue(14)
    }
   
})
