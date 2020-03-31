import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom' // useHistory serve para após o cadastro mandar o usuário para o inicio da pagina
import api from '../../services/api'
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css'

import logoImg from '../../assets/logo.svg'

// A forma de pegar todas as informações dos formulario e enviar para o banco de dados é usar o useState

// Lembrando a sintaxe do useSate o primeiro no array é o valor e o segundo é a funcão para atuallizar a função

export default function Register() {

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [whatsapp, setWhatsapp] = useState('')
const [city, setCity] = useState('')
const [uf, setUf] = useState('')

const history = useHistory()

    async function handleRegister(e) { // Vamos receber o evento de submit no formulario e vamos fazer um prevent event default para a página não ficar carregando que o padrão do browser
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
        const response = await api.post('ongs', data) // Ja faz o cadastro, ongs é a rota, o axios ja envia de forma Json
        alert(`Seu ID de acesso: ${response.data.id}`)
        history.push('/') // Envia o usuario após o cadastro para a Rota Raiz
        } catch (err) {
            alert('Erro no cadastro tente novamente!')
        }
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                        <Link className="back-link" to="/">         {/* Nós trocamos o a href para Link to para funcionar a SPA */}
                        <FiArrowLeft size={16} color="#E02041" />
                          Já tenho cadastro, fazer o logon
                        </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    <div className="input-group">
                    <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                    <input placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}