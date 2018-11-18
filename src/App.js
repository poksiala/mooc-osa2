import React from 'react'


const Otsikko = ({text}) => <h1>{text}</h1>

const Osa = ({data}) => <p>{data.nimi} {data.tehtavia}</p>

const Sisalto = ({osat}) => {

  return(
    <div>
      {osat.map(osa => <Osa key={osa.id} data={osa} />)}
    </div>
  )
}

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko text={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

export default App
