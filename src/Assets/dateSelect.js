import React, {useState} from 'react'
import { StyleSheet, Text,TextInput,  View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker"; //https://github.com/mmazzarolo/react-native-modal-datetime-picker
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Styles/Colors';


const NewEntryDatePicker = ({value, onChange}) => {

    const [dataVisible, setDataVisible] = useState(false);

    const onChangeValue = date => {
        onCancel();
        onChange(date);
    };

    const onCancel = () => {
        setDataVisible(false);
    };
     

    return (
        <View>
  
        <TouchableOpacity style={styles.button} title="Show Date Picker" onPress={() => setDataVisible(true)}>
         
            <Icon name="today" size={30} color={Colors.textoBranco} />
        </TouchableOpacity>

      <DateTimePickerModal
        mode="date" 
        datePickerModeAndroid="calendar"
        titleIOS="Início das Aulas"
        cancelTextIOS="Cancelar"
        confirmTextIOS="Ok"
        date={value}
        isVisible={dataVisible}
        onConfirm={onChangeValue}
        onCancel={onCancel}
        
      />
        </View>
    )
}

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
    }
})

export default NewEntryDatePicker;


