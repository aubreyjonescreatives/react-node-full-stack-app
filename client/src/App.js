import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import DeckofCards from './DeckofCards'
import TopNavigation from './TopNavigation'
//import { CSSTransition } from 'react-transition-group'




function App() {
 
  return (
   <Router>
       <TopNavigation/>
     <Route path='/' exact component={DeckofCards}/>
   </Router>

  )

}

export default App;
