import {Picker} from '@react-native-picker/picker';

import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

const ListPicker = ({itemValue, itens, onChange, texto}) => {

    const [itemEscolhido, setItemEscolhido] = useState("Selecione uma escola");

      //  const [itensRender, setItensRender] = useState([itens]);
   

    
        const renderItens = () => {
       
                <Picker.Item label="raul lopes moitinho - Planalto" value={{inep: '111111111',nome: 'raul lopes moitinho', cidade: 'Planalto', estado: 'BA'}} />
            //    <Picker.Item label="Davina Lins de Albuquerque - Planalto" value={{inep: '222222222',nome: 'Davina Lins de Albuquerque', cidade: 'Planalto', estado: 'BA'}} />
            //    <Picker.Item label="Demosthenes da Silveira - Planalto" value={{inep: '333333333',nome: 'Demosthenes da Silveira', cidade: 'Planalto', estado: 'BA'}} /> */}
             

           // console.log('dentro do renderintens ',item);
            
           
           // return listaDeItens;
        }

    const onChangeValue = (itemValue) => {
                onChange(itemValue);
                setItemEscolhido(itemValue);
    }

    return (
        <View style={styles.picker}>
               
            <Picker 
           
                mode="dialog"
                prompt={texto}
                numberOfLines={2}
                selectedValue={itemEscolhido}
                onValueChange={(itemValue, itemIndex) =>
                onChangeValue(itemValue,itemIndex)
                }>

                 <Picker.Item label="escolha um item da lista" value="555" />
                 <Picker.Item label="escolha um item da lista" value="" enabled={false}/>
                {/* <FlatList
                data={itens}
                renderItem={(item) => <Text>{}</Text>}
                keyExtractor={item => item.id}
                /> */}
                {/* {  [itens].forEach(element => {
                                        <Picker.Item label="escolha um item da lista" value="a" />



                                        console.log(element)
                                    })} */}
                


            </Picker>
               
       
        </View>
    )
}

export default ListPicker

const styles = StyleSheet.create({
    picker: {
        backgroundColor: 'white',
        width: '80%',
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center'
    }
})
