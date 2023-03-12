import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function SuccessPage({poltrona, setPoltrona, cpf, setCpf, nome, setNome}) {

    const navigate = useNavigate()
    const listaPoltrona = poltrona.map(assentos => {
        console.log(assentos)

        return <p>Assento {assentos}</p>

    })

    function voltar (){
       setPoltrona([])
       navigate("/")
       setNome("")
       setCpf ("")

    }

    const [teste, setTeste] = useState()
    const [testeDois, setTesteDois] = useState()
    const [titulo, setTitulo] = useState()

    const {idFinal} = useParams()

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idFinal}/seats`

        const promise = axios.get(url)

        promise.then((res) => {
           setTeste(res.data.day.date)
           setTesteDois(res.data.name)
           setTitulo(res.data.movie.title)
         })
          
        promise.catch(err => console.log(err.response.data))

    }, [])

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{titulo}</p>
                <p> {teste} - {testeDois}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
               
                {listaPoltrona}

            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {nome}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>
            <Link to="/">
            <button onClick={voltar}>Voltar para Home</button>
            </Link>
            
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`