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
  
  export default Kurssi