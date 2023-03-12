import styled from "styled-components"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function SeatsPage({poltrona, setPoltrona}) {

    const [selecionado, setSelecionado] = useState([])
    
    function click (id, isAvailable, name) {
       
      if (!isAvailable){
        alert('O Assento não está disponível')
      } else {
        setSelecionado((t) => {
            if (t.includes(id)) {
                return t.filter((t) => t !== id);
            }
            else  {
                return [...t, id]
            }
        })
        setPoltrona((teste) => {
            if (teste.includes(id)){
                return teste.filter((teste) => teste !== id)

            }
            else {
                return [...teste, id]
            }
        })
    
    } 
    }

    const [assentos, setAssentos] = useState ()
    const [fotoetexto, setFotoetexto] = useState()
    const [hora, setHora] = useState()
    const [dia, setDia] = useState()

    const {idSessao} = useParams()

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`

        const promise = axios.get(url)

        promise.then((res) => {
            setFotoetexto(res.data.movie)
            setAssentos(res.data.seats)
            setHora(res.data)
            setDia(res.data.day)
            console.log(res.data.seats)
        })
        promise.catch(err => console.log(err.response.data))

    } , [])
    
  if (assentos === undefined){
    return <div>carregando...</div>
  }

    return (
        <PageContainer>
            Selecione o(s) assento(s)
          
            <SeatsContainer >
            {assentos.map(({id, name, isAvailable}) => (
                <SeatItem isAvailable={isAvailable}
                 id={id} 
                 select={selecionado.includes(id)}
                 onClick={() => click(id, isAvailable)}> {name} </SeatItem>
                ))} 
            </SeatsContainer>
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircleSelecionado/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleDisponivel/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleIndisponivel/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <form>
            <FormContainer htmlFor="name" >
                Nome do Comprador:
                <input placeholder="Digite seu nome..."
                />
                </FormContainer>
                <FormContainer htmlFor="cpf"
                >
                CPF do Comprador:
                <input id="cpf" placeholder="Digite seu CPF..."
                />
                <Link to={`/sucesso/${hora.id}`}>
                <button type="submit" >Reservar Assento(s)</button>
                </Link>
            </FormContainer>
            </form>

            <FooterContainer>
                <div>
                    <img src={fotoetexto.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{fotoetexto.title}</p>
                    <p>{dia.weekday}- {hora.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`


const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.label`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircleSelecionado = styled.div`
    border: 1px solid #0E7D71;         // Essa cor deve mudar
    background-color: #1AAE9E;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const CaptionCircleDisponivel = styled.div`
    border: 1px solid #7B8B99;         // Essa cor deve mudar
    background-color: #C3CFD9;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const CaptionCircleIndisponivel = styled.div`
    border: 1px solid #F7C52B;         // Essa cor deve mudar
    background-color: #FBE192;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    
`
const SeatItem = styled.div`
    border: 1px solid ${({isAvailable, select}) => select ? "#0E7D71" : isAvailable ? "#808F9D" : "#F7C52B"};         // Essa cor deve mudar
    background-color: ${({ isAvailable, select}) => select ? "#1AAE9E" : isAvailable ? "#C3CFD9" : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`