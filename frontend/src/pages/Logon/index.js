import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

import api from '../../services/api'

export default function Logon() {

    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('session', {id}) // Rota session e agente precisa enviar um objeto contendo
           
            localStorage.setItem('ongId', id) // Salvar esta informação de login - Criei uma variavel ongID para ser armazenadano Browser
            localStorage.setItem('ongName', response.data.name) // Salvar esta informação de login - Criei uma variavel ongName para ser armazenadano Browser
            history.push('./profile')
        
        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    } 

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                 <form onSubmit={handleLogin}> {/* Não pode esquecer de colocar a handle para disparar a função */}
                     <h1>Faça seu logon</h1>
                      <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                      <button className="button" type="submit">Entrar</button>
                      <Link className="back-link" to="/register">         {/* Nós trocamos o a href para Link to para funcionar a SPA */}
                          <FiLogIn size={16} color="#E02041" />
                          Não tenho cadastro
                      </Link>
                 </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}