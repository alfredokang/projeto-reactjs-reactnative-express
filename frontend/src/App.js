import React from 'react'
import './global.css'
// import Logon from './pages/Logon' // Não precisa importar o index, porque sempre quando vc refencia uma pasta ele procura pelo index
import Routes from './routes'

// Os atributos em React são como classes, que são passados dentro dos componentes
// Todos os componentes devem set com letras maiúsculas
// As propriedades são como nome de classe, titulo, etc e elas vem como o parâmetro da função
// As propriedades precisam estar entre chaves para serem interpretadas pelo React
// {props.children} a propriedade children pega tudo entre as chaves definidas. Ex.: <Header><h1>Love You</h1></Header>
// children seria o Love You

// function App() {
//   const [counter, setCounter] = useState(0)

// Para alterar o valor vc precisa alterar o estado, ou seja, o componenete ira renderizar novamente, para isto vc precisa importar o {useState}
// Imutabilidade: vc não pode alterar este valor dp estadp de uma forma direta, nós precisamos sobrepor o valor
// Quando vc usa o useState ele retorna um array com 2 posições: A primeira posição é o valor da variável, a segunda é uma função que atualiza o valor
// Array [valor, funçãoDeAtualizacao]

  // function increment() {
  //   setCounter(counter + 1)
  // }
      // No React a partir de 2 elementos vc precisa colocar uma div ou um fragmento para conteinizar eles

function App() {      
    return (
      <Routes />
  )
}

export default App