import React from 'react';
import axios from 'axios'

const CountryDetails = ({country}) => {
  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt={country.name} />
    </div>
  )
}

const CountryListing = ({countries}) => {
  return(
    <div>
      {countries.map(c => <div key={c.alpha3Code}>{c.name}</div>)}
    </div>
  )
}

const Filter = ({value, handler}) =>
  <div>
    find countries: <input
      value={value}
      onChange={handler}
    />
  </div>


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }
  
  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }

  handleFilterChange = (event) => {
    event.preventDefault()
    this.setState({filter: event.target.value})
  }

  render() {

    const filteredCountries = this.state.countries.filter(p => 
      p.name.toLowerCase().includes(this.state.filter.toLowerCase()) )

    const content = (filteredCountries.length > 10) ?
      <p>too many matches, specify another filter</p> :
      (filteredCountries.length === 1) ?
        <CountryDetails country={filteredCountries[0]} /> :
        <CountryListing countries={filteredCountries} />

    return (
      <div>
        <Filter value={this.state.filter} handler={this.handleFilterChange} />
        {content}
      </div>
    )
  }
}

export default App