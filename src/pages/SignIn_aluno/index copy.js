import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

import Colors from '../../Styles/Colors';
import speech from '../../Assets/textToSpeech';

const SignIn_aluno = ({navigation}) => {

    const [Login, setLogin] = useState('');
    const [help, setHelp] = useState('Use o Login dado pela sua professora para poder entrar !')

    const ajudaEmVoz = () =>{

      speech(help);

    }

    return (
        <View style={styles.container}>
           
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
                    value={Login}
                    onChangeText={(text) => {
                        setLogin(text);
                    }}
                />
            
                <View style={styles.cardButtons}>
                    <TouchableOpacity style={styles.botaoConfirmar}>
                        <Text style={styles.textoBotao}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoHelp}
                        onPress={() => ajudaEmVoz()}
                    >
                        <Text style={styles.textoBotao}>Ajuda</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    },
    botaoHelp: {
        backgroundColor: Colors.help,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 90,
        height: 35,
        borderWidth: 1,
    },
    botaoCabecalho: {
        backgroundColor: Colors.BotaoClaro,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 160,
        height: 26,
        borderWidth: 1,
    },
    cabecalho: {
        //backgroundColor: Colors.BotaoClaro,
       // flex: 0.1,
        alignItems: 'flex-end',
        margin: 4
    },
    textoBotao: {
        color: Colors.textoBranco,
        fontSize: 22
    },
    textoBotaoCabecalho: {
        color: Colors.textoBranco,
        fontSize: 18,
      
    },
    textInput: {
        backgroundColor: 'white',
        width: '80%',
        height: 35,
        borderRadius: 2,
        borderWidth: 1,
        alignSelf: 'center'
    }
   
})
