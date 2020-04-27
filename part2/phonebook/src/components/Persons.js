import React from 'react';

const Persons = ({persons, filter, deletePerson}) => {
    return (
        <>
        {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person, id) =>
            <div key={id}>
            <p key={id}>{person.name} {person.phone}</p>  
            <button 
                onClick={(event) => deletePerson(event, person.id, person.name)}>
                delete
            </button>
            </div>
        )}
        </>
    )
}

export default Persons