import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Text, View } from 'react-native';
import Routes from './src/routes';

// A tag View é usado como se fosse div e o Text é usado para todo tipo de texto, todo Text é text
// Para estilizar precisa sempre passar a tag syles.
// Todos elementos ja possuem display flex por padrão
// As propriedades do estilos estão em CamelCase e nao com hifen, ex.: background-color, no native é backgroundColor
// As valores das propriedades precisam estar entre aspas
// Não existe herança de estilos para passar um estilo vc precisa adicionar em cada elemento
// Para adicionar estilos nos Elementos style={styles.container}, style={styles.title}
export default function App() {
  return (
    <Routes />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#7159c1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });
