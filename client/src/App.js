import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Welcome from './Welcome'
import PopularGames from './PopularGames'
import CardGames from './CardGames'
import TopNavigation from './TopNavigation'
//import { CSSTransition } from 'react-transition-group'




function App() {
 
  return (
   <Router>
       <TopNavigation/>
       <Route path='/' exact component={Welcome}/>
     <Route path='/populargames' exact component={PopularGames}/>
     <Route path='/cardgames' exact component={CardGames}/>
   </Router>

  )

}

export default App;
