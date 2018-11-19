import React from 'react';

const Person = ({person}) => <tr><td>{person.name}</td><td>{person.number}</td></tr>

const Persons = ({persons}) => {
  const personList = persons.map(person =>
    <Person key={person.name} person={person} />)

  return (
    <table>
      <tbody>
        {personList}
      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }
  
  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.filter(p => p.name === this.state.newName).length === 0) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      
      const persons = this.state.persons.concat(personObject)

      this.setState({persons, newName: '', newNumber: ''})
    } else {
      this.setState({newName: '', newNumber: ''})
    }
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
        
        <div>
          rajaa näytettäviä: <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>

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
        <Persons persons={filteredPersons} />
      </div>
    )
  }
}

export default App