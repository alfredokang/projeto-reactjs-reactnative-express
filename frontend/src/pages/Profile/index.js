import React, {useState, useEffect} from 'react' // useEffect - Dispara uma função em algum determinado momento do componente
import {Link, useHistory} from 'react-router-dom'
import {FiPower} from 'react-icons/fi'
import {FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Profile() {
    
    const [incidents, setIncidents] = useState([])

    // Armazenamento no Header
    const history = useHistory()
    const ongId = localStorage.getItem('ongId') 
    const ongName = localStorage.getItem('ongName')

    // o primeiro parametro qual funcao que seja executada, o segundo parametro quando ela vai ser executada
    useEffect(() => {
        api.get('profile', {headers: {Authorization: ongId}})
            .then(response => {setIncidents(response.data)})
    }, [ongId]) 

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {headers: {Authorization: ongId}})
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}> 
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
// O Intl.NumberFormat ele converte a moeda para o país de origem
// ATENÇÃO: onClick={() => handleDeleteIncident(incident.id)} - Tem que passar uma função para onclick se passar apenas a função
// handleDeleteIncident(incident.id)}, ela vai apagar tudo porque ele entende que vc esta passando o retorno da função
// e vc quer passar a função, precisa tomar cuidado com isto.