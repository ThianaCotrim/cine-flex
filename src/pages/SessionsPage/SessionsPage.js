import styled from "styled-components"
import { Link, useParams} from "react-router-dom"

import {useEffect, useState} from "react"
import axios from "axios"

export default function SessionsPage() {
    const[sessao, setSessao] = useState (undefined)

   const {idFilme} = useParams()
   
   useEffect(()=> {

    const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`

    const promise = axios.get(url)

    promise.then(res => (setSessao(res.data)))
    promise.catch(err => console.log(err.response.data))
    
   }, [])
 
//    useEffect(() => {

//     const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}`

//     const promisse = axios.get(url)
//     promisse.then(res => console.log(res.data.days))
//     promisse.catch(err => console.log(err.response.data))


//    }, [])

   if (sessao === undefined) {
    return (
        <div> CARREGANDO....</div>
    )
}

    // const [sessao, setSessao] = useState ()

    //     useEffect( () => {

    //         const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies/ID_DO_FILME/showtimes"

    //         const promisse = axios.get(url)
        
    //         promisse.then((res) => {
    //             console.log(res.data)
                
    //         })

    //         promisse.cath((err) => {
    //             console.log(err.responde.data)
                
    //         })



    //     })
    

    return (
        <PageContainer>
            Selecione o horário
            <div>
                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <Link to="/assentos/:idSessao">
                        <button>14:00</button>
                        </Link>
                        <Link to="/assentos/:idSessao">
                        <button>15:00</button>
                        </Link>
                        
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                    <Link to="/assentos/:idSessao">
                        <button>14:00</button>
                        </Link>
                        <Link to="/assentos/:idSessao">
                        <button>15:00</button>
                        </Link>
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                    <Link to="/assentos/:idSessao">
                        <button>14:00</button>
                        </Link>
                        <Link to="/assentos/:idSessao">
                        <button>15:00</button>
                        </Link>
                    </ButtonsContainer>
                </SessionContainer>
            </div>

            <FooterContainer>
                <div>
                    <img src={sessao.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessao.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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