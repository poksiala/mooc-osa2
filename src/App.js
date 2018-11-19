import React from 'react';
import personService from './services/persons'

const Person = ({delHandler, person}) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={delHandler(person)}>Poista</button></td>
    </tr>
  )
}

const Persons = ({delHandler, persons}) => {
  const personList = persons.map(person =>
    <Person delHandler={delHandler} key={person.name} person={person} />)

  return (
    <table>
      <tbody>
        {personList}
      </tbody>
    </table>
  )
}

const Filter = ({value, handler}) =>
  <div>
    rajaa näytettäviä: <input
      value={value}
      onChange={handler}
    />
  </div>


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }
  
  biggestId() {
    return this.state.persons.reduce((a, b) => (a < b.id) ? b.id : a, 0)
  }

  componentDidMount() {
    personService.getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.filter(p => p.name === this.state.newName).length === 0) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.biggestId() + 1 
      }
      
      personService.create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        })

    } else {
      this.setState({newName: '', newNumber: ''})
    }
  }

  delPerson = (person) => {
    return (
      () => {
        if (window.confirm(`poistetaanko ${person.name}?`)) {
          personService.del(person.id).then(
            this.setState({
              persons: this.state.persons.filter((p) => p.id !== person.id)
            })
          )
        }
      }
    )
  }

  handleNameChange = (event) => {
    event.preventDefault()
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    event.preventDefault()
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    event.preventDefault()
    this.setState({filter: event.target.value})
  }

  render() {

    const filteredPersons = this.state.persons.filter(p => 
      p.name.toLowerCase().includes(this.state.filter.toLowerCase()) )

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        
        <Filter value={this.state.filter} handler={this.handleFilterChange} />
        <h2>Lisää uusi!</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons delHandler={this.delPerson} persons={filteredPersons} />
      </div>
    )
  }
}

export default App