import React, {useState} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/dist/FontAwesome5';
import Colors from '../Styles/Colors';

const EscolaModal = ({itensPesquisados, onChange, onChangePesquisa, disable}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
   
    
    
    
    const setEscola = (item) => {
        onChange(item);
       // setPesquisa(item);
        setModalVisible(false);
    }
  



    return (
        <View>
            
        <TouchableOpacity style={styles.button}  onPress={() => setModalVisible(true)} >
         <Icon name="search" size={30} color={Colors.textoBranco} />
        </TouchableOpacity>


        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}
      >
            <View style={styles.centeredView}>
           <View style={styles.modalView}>
            
        
           <Text style={styles.label}>Digite o nome da Esola: </Text>
           <View style={{flexDirection: 'row'}}>
            <TextInput
                style={styles.textInput}
                value={pesquisa}
                autoCompleteType="off"
                keyboardType="default"
                onChangeText={(text) => {
                    setPesquisa(text);
                    
                }}

            />

          
             <TouchableOpacity style={[styles.button, {backgroundColor: (disable == false ? 'green' : 'red')}]}  onPress={() => onChangePesquisa(pesquisa)} >
            <Icon name="search" size={30} color={Colors.textoBranco} />
            </TouchableOpacity>
  </View>
                <FlatList
                style={styles.flatList}
                data={itensPesquisados[1]}
                keyExtractor={item => item.cod}
                renderItem={({item})=>  
             
                <TouchableOpacity 
                style={styles.itensDaLista}
                onPress={() => setEscola({item})}
                >
                    
                    <Text style={styles.textoLista}>{item.nome}</Text>
                    <Text style={styles.textoLista}>{item.cidade} - {item.estado}</Text>
                    
                </TouchableOpacity>
                
                 
                    }
                />
        </View>
        </View>
      </Modal>

        </View>
    )
}

export default EscolaModal

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.BotaoClaro,
        width: 59,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 2,
        borderWidth: 1,
    },
    centeredView: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        marginBottom: 0,
        marginTop: 30,
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'grey',
        padding: 20,
        alignItems: "center",
    }, 
    label: {
        color: 'black',
        fontSize: 22,
        width: '100%',
        alignSelf: 'center', 
    },  
    textInput: {
        backgroundColor: 'white',
        width: 210,
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
        alignSelf: 'center',
        fontSize: 15,
    },
    flatList: {
        marginTop: 25
    },
    itensDaLista: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        marginVertical: 5,
    },
    textoLista: {
        fontSize: 20,
        //margin: 2
    }
})
