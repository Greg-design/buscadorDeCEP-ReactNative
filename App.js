import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from  './src/services/api'

export default function App() {

  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null)

  async function buscar() {
    if (cep == ''){
      alert('Digite um cep válido')
      setCep('')
      return;
    }

    try{                                               
      const response = await api.get(`/${cep}/json`)  //nesse caso usamos o try catch para tratar possiveis erros
      console.log(response.data)
      setCepUser(response.data)
      Keyboard.dismiss() // isso faz com q o teclado seja fechado depois da busca
    }catch(error){
      console.log('erro: ' + error)
    }
  }

  function limpar(){
    setCep('') //aqui quando clicar ele voltar pra vazio o campo
    inputRef.current.focus()
    setCepUser(null)
  }

  return (
    <SafeAreaView style={styles.container}>
     <View style={{alignItems: 'center'}}>
      <Text style={styles.text}>Digite o CEP desejado</Text>
      <TextInput 
        style={styles.input}
        placeholder='Ex: 79003241'
        value={cep}
        onChangeText={(texto)=>setCep(texto)} //quando digitar onde eu vou armazenar, usamos ai o useState
        keyboardType='numeric'
        ref={inputRef}
      />
     </View>

     <View style={styles.areaBtn}>
        <TouchableOpacity 
        style={[styles.botao, { backgroundColor:'#1d75cd' }]}
        onPress={ buscar }
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
         onPress={ limpar }
         >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
     </View>
                   {/* os doi && significa, se tiver alguma dentro de cepUser ai ele renderiza */}
      { cepUser && 
         <View style={styles.resultado}>
         <Text style={styles.itemText}>Cep: {cepUser.cep}</Text>
         <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
         <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
         <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
         <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      } 
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize:25,
    fontWeight:'bold'
  },
  input: {
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop:15,
    justifyContent: 'space-between'
  },
  botao: {
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 50,
  },
  botaoText: {
    fontSize: 16,
    color: '#fff',
  },
  resultado: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 22
  }
});
