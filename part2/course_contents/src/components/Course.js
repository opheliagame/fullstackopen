import React from 'react'

const Course = ({course}) => {
return (
    <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
    </div>
)
}

const Header = ({ course }) => {
return (
    <h2>{course.name}</h2>
)
}

const Total = ({ course }) => {
const exercises = course.parts.map(part => part.exercises)
const sum = exercises.reduce((a, b) => a+b, 0)
return(
    <strong>total of {sum} exercises</strong>
) 
}

const Part = (props) => {
return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>    
)
}

const Content = ({ course }) => {
return (
    <div>
    {course.parts.map(part => 
        <Part key={part.id} part={part} />
    )}
    </div>
)
}

export default Course