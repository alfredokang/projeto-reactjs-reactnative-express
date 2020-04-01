import React, { useState, useEffect } from 'react'; // useEffect é uma função que será disparado quando estas variaveis da função mudarem
import { Feather } from '@expo/vector-icons'; // Pacote de vetores do próprio expo
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
// O FlatList faz a listagem colocando o Scroll
import api from '../../services/api'

import logoImg from '../../assets/logo.png' // Ele importa a Logo no melhor formato automaticamente

import styles from './styles'

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1) // Fazendo a paginação, qual o numero da página que eu estou no momento, ele vai iniciar com o valor de 1
    const [loading, setLoading] = useState(false) // Vamos criar um estado de loading para a paginação, para armezenar uma informação quando estivermos buscando dados novos para evitar que estes dados sejam buscados novamente 

    const navigation = useNavigation() // É como se fosse o useHistory do React JS
                                               // Fazendo uma Gambiarra para aproveitar que a pagina sera recarregada em outro lugar e esta aproveitando para enviar os dados carregados     
    function navigateToDetail(incident) {              // abaixo em TouchableOpacity na propriedade onPress que carrega as informações da base de dados
        navigation.navigate('Details', { incident }) // Vou passar a rota
    }

    async function loadIncidents() {
        if (loading) {
            return  // Para evitar quando uma requisição for feita mais uma aconteça
        }

        if (total > 0 && incidents.length === total) {
            return    // Não faz mais sentido buscar mais informações ai da um return para brekar
        }

        setLoading(true)

        // const response = await api.get(`incidents?page=${page}`) // É a mesma coisa da linha de baixo para vc entender. A rota é incidents -> Puxando as informações do Banco de dados
        const response = await api.get('incidents', {params: { page }})
        
        setIncidents([ ...incidents, ...response.data]) // Dados do banco de dados caregados // Anexando 2 vetores dentro de 1 vetor
        setTotal(response.headers['x-total-count']) // O Total vem do Header, a Variavel criamos no Backend
        setPage(page + 1)
        setLoading(false)
    } 

    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
           
            <FlatList data={incidents} keyExtractor={incident => String(incident.id)} 
                showsVerticalScrollIndicator={false} style={styles.incidentList}
                 onEndReached={loadIncidents} onEndReachedThreshold={0.2} renderItem={({ item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                 
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                 
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                </View>
            )}/>
        </View>
    );
}

// O nome do Feather vc consegue escolher pelo site do expo

// Em navigate do Detail como na web vc nao pode passar a funcão navigateToDetail(incident), porque isto vai executar sem ser exibido em tela
// vc sempre precisa passar uma função e não um valor de uma função
// onEndReached ela aceita uma funcao quando o ususrio chega no final da lista
// onEndReachedThreshold={0.2} quantos % do final da lista o usuario precisa estar para carregar a nova lista o valor vai de 0 a 1