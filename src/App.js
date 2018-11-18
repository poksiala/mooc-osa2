import React from 'react'

const Yhteensa = ({osat}) => {
  const calc = (l) => l.map(o => o.tehtavia).reduce((a, b) => a + b, 0)

  return (
    <p>yhteensä {calc(osat)} tehtävää</p>
  )
}

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
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

export default App
