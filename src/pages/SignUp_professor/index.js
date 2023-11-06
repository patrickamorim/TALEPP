import React, {useState}  from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import {signIn as login, SignUp} from '../../services/Auth';
import {RFValue} from 'react-native-responsive-fontsize'
import Colors from '../../Styles/Colors';

const SignUp_professor = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (loading === false && email != '' && password != '' && nome != ''){
            setLoading(true);
            const {signUpSuccess} = await SignUp({
                email,
                password,
                nome
            });
            if (signUpSuccess === true){
               
                navigation.reset({
                    index: 0,
                    key: null,
                    routes: [{name:'MinhasTurmas'}]
                });

                Alert.alert('Cadastro realizado com sucesso !', 'Essa é a tela das suas turmas, para criar uma turma nova basta pressionar no ícone superior direito com um "+"');
            } else {
               
                setLoading(false);
            }
        }else {
            alert('insira os dados para entrar na área do professor !')
        }

    }

    return (
        <View style={styles.container}>
                   

            <View style={styles.card}> 
            <Text style={styles.titulo}>Olá Professor !</Text>
            <Text style={[styles.textoGeral, {marginBottom: 25}]}>Preencha os dados e clique em ENVIAR para se cadastrar</Text>

            <Text style={styles.label}>Nome:</Text>
            
            <TextInput
                style={styles.textInput}
                value={nome}
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(text) => {
                    setNome(text);
                }}
            />

            <Text style={styles.label}>E-mail:</Text>
            
            <TextInput
                style={styles.textInput}
                value={email}
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={(text) => {
                    setEmail(text);
                }}
            />
            <Text style={styles.label}>Senha:</Text>
            
            <TextInput
                style={styles.textInput}
                value={password}
                autoCompleteType="password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                    setPassword(text);
                }}
            />
           
            <View style={styles.cardButtons}>
                <TouchableOpacity style={styles.botaoConfirmar}
                onPress={() => onSubmit()}
                >
                    <Text style={styles.textoBotao}>
                        {loading ? 'cadastrando ...' : 'Enviar'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.botaoHelp}
                onPress={() => navigation.navigate('SignIn_professor')}
                >
                    <Text style={styles.textoBotao}>Voltar</Text>
                   
                </TouchableOpacity>
                
            </View>
                <TouchableOpacity
                onPress={() => Alert.alert("Implementação futura!")}
                >
                    <Text style={[styles.textoGeral, {textDecorationLine: 'underline'}]}>Não possuo Login</Text>
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp_professor

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
        
        fontSize: RFValue(35),
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
        width: 100,
        height: 35,
        borderWidth: 1,
        borderRadius: 5
    },
    botaoHelp: {
        backgroundColor: Colors.help,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 100,
        height: 35,
        borderWidth: 1,
        borderRadius: 5
    },
    textoBotao: {
        color: Colors.textoBranco,
        fontSize: RFValue(22)
    },
    textInput: {
        backgroundColor: 'white',
        width: '80%',
        height: 35,
        borderRadius: 2,
        borderWidth: 1,
        alignSelf: 'center',
        fontSize: RFValue(14),
        borderRadius: 5
        
    },
    textoGeral: {
        color: 'black', 
        
        textAlign: 'center'
    }
   
})

