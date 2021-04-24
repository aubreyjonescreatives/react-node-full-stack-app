import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import PopularGames from './PopularGames'
import CardGames from './CardGames'
import TopNavigation from './TopNavigation'
//import { CSSTransition } from 'react-transition-group'




function App() {
 
  return (
   <Router>
       <TopNavigation/>
       <Route path='/' exact component={CardGames}/>
     <Route path='/populargame' exact component={PopularGames}/>
   </Router>

  )

}

export default App;
