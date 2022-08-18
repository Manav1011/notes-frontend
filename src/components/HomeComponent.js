import React from 'react'
import NotesCard from '../assets/NotesCard'


const HomeComponent = ({darkMode}) => {  

  return (
    <>    
    <div className={`mt-4 mx-2 rounded`}>    
      <NotesCard darkMode={darkMode}/>
    </div>
    </>
  )
}

export default HomeComponent