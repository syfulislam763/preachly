import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';

const CustomSelect = ({ items = [{label:'Denomination',value:0}], onSelect, placeholder = "Denomination" }) => {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect && onSelect(item);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(true)}>
        <Text style={selected ? styles.selectedText : styles.placeholderText}>
          {selected ? selected.label : placeholder}
        </Text>

        <Image 
            source={require("../../assets/img/CaretDown.png")}
            style={{
                height:30,
                width:30,
                objectFit:'contain'
            }}
        />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdownList}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.4,
    borderColor: '#b3c5c5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  placeholderText: {
    color: '#607373',
    fontSize: 18,
    fontFamily:'NunitoSemiBold'
  },
  selectedText: {
    color: '#333',
    fontSize: 16,
  },
  icon: {
    fontSize: 16,
    color: '#9ea6ab',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    maxHeight: 300,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default CustomSelect;
