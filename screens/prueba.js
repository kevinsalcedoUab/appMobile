import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    cosa: 'loco',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    cosa: 'oee',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    cosa: 'uaaa',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d3',
    title: 'fourth Item',
    cosa: 'te',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'fifth Item',
    cosa: 'vas',
  },{
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'sixth Item',
    cosa: 'no',
  },
];

function Item({ id, title, cosa, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#0000FF' : '#6495ED' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{cosa}</Text>

    </TouchableOpacity>
  );
}

export default function App() {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  var x=5;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            cosa={item.cosa}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
          <Text style={styles.item}>
          HOLA
        </Text>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#8A2BE2',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});


