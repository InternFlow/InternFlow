import React from 'react'
import Class from './Class'
export default function Classes(props) {
    const classes = props.classes;
  return (
    <div className='container'>
      {classes.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)).map((item) => (
        <Class class={item}></Class>
      ))}
    </div>
  )
}
