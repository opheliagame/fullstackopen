import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()

    //check if person already in phonebook
    if(persons.some(p => p.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName)
        const updatedPerson = {
          ...existingPerson,
          phone: newPhone
        }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : updatedPerson
            ))
            setNewName('')
            setNewPhone('')
            setMessage({
              text: `Updated ${updatedPerson.name}`,
              error: false})
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })        
          .catch(response => {
            setMessage({
              text: `Information of ${newName} has already been removed from server`,
              error: true
            })
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        phone: newPhone
      }

      personService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewPhone('')
          setMessage({
            text: `Added ${newPerson.name}`,
            error: false 
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }
  const deletePerson = (event, id, name) => {
    event.preventDefault()
    if(window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
        
    }
    
  }

  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons} 
        filter={filter}
        deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
