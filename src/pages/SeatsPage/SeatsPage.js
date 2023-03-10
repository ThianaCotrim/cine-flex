import styled from "styled-components"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function SeatsPage() {

    const [testeum, setTesteum] = useState('')

    // const [name, setName] = useState()
    // const [cpf, setCpf] = useState()

    function reservarAssento (e) {
        setTesteum(e.target.value);

        // e.preventDefault()

    //         const urlReserva = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
    //         const cadeira = {name, cpf}

    //         const promise = axios.post(urlReserva, cadeira)

    //         promise.then(res => alert('sua cadeira foi reservada'))
    //         promise.catch(err => alert ('Deu erro, não foi reservado'))
    // 
}

    // const [trocarCor, setTrocarCor] = useState(true)
    
    // function click () {
    //     setTrocarCor(prevState => !prevState)
    // }

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
            {assentos.map(({name, isAvailable}) => (
                <SeatItem isAvailable={isAvailable} > {name} </SeatItem>
                ))} 
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <form onSubmit={reservarAssento}>
            <FormContainer htmlFor="name" >
                Nome do Comprador:
                <input 
                // id="name" 
                placeholder="Digite seu nome..."
                // value={name}
                // onChange={e => setName(e.target.value)} 
                onChange={reservarAssento}
                value={testeum}
                />
                </FormContainer>
                <FormContainer htmlFor="cpf"
                >
                CPF do Comprador:
                <input 
                id="cpf" 
                placeholder="Digite seu CPF..."
                // value={cpf}
                // onChange={e => setCpf(e.target.value)} 
                onChange={reservarAssento}
                value={testeum}
                />

                <Link to={`/sucesso/${hora.id}`} testeum={testeum}>
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
// style={{ backgroundColor: trocarCor ? 'lightblue' : '#1AAE9E' }}


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
const CaptionCircle= styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
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
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: ${({ isAvailable}) => isAvailable ? "#C3CFD9" : "#FBE192"};    // Essa cor deve mudar
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