import { useContext, useEffect, useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import { authContext } from './Contexts/AuthContext'

//Importing components

import Navbar from './Components/Navbar'
import Overview from './Components/Overview'
import Pipelines from './Components/Pipelines'
import Templates from './Components/Templates'
import DataRoutes from './Components/DataRoutes'
import Monitoring from './Components/Monitoring'
import NewPipeline from './Components/NewPipeline'
import Settings from './Components/Settings'
import LoginPage from './Components/LoginPage'
import Header from './Components/Header'
import CreateTemplate from './Components/CreateTemplate'
import CreateDataRoute from './Components/CreateDataRoute'
import StorageCleaner from './StorageCleaner'

function App() {

  const { reqBody } = useContext(authContext)

  const [isLogged, setIsLogged] = useState(false)

  const [showNavBar, setShowNavBar] = useState(false)

  //authentication

  useEffect(() => {
    Object.keys(reqBody).map((key) => {
      localStorage.setItem(key, reqBody[key])
    })
    //reqBody.logOut == true && () => {localStorage.clear(); setIsLogged(false)}
    
  }, [reqBody])

  useEffect(() => {
    if(reqBody.logOut == true){
      localStorage.clear()
      setIsLogged(false)
    }else{
      if(localStorage.first_name != undefined){
        setIsLogged(true)
      }else{
        setIsLogged(false)
      }
    }
    ////////////////////
    console.log('Req Body', reqBody)
    ////////////////////
  }, [reqBody])

  if(isLogged == false && localStorage.first_name == undefined){return(
    <>
      <div id='display' className='container'>
        <div id='appBoard'>
          <div id='workspace'>
            <LoginPage setIsLogged = {() => setIsLogged(true)}/>
          </div>
        </div>
      </div>
    </>
  )}

  return (
    <>
      <div id='display' className='container'>
        <div id='appBoard'>
          <div id='mainHeader'>
              <button onClick={() => setShowNavBar(!showNavBar)} id='hamburgerButton'><img src="/header/hamburger_icon.svg"></img></button>
              <Header></Header>
          </div>
          <div id='workspace' className='regular'>
            <div id='shadow' className={!showNavBar && 'hidden'}></div>
            <BrowserRouter>
              <div id='navSpace'>
                <Navbar showNavBar = {showNavBar}/>
              </div>
              <Routes>
                {/*<Route path='/' element = {<Overview />} /> Remove commentaries after adding overview! */
                 <Route path='/' element = {<Pipelines />} />}
                <Route path='/pipelines' element = {<Pipelines />} />
                <Route path='/templates' element = {<Templates />} />
                <Route path='/data_routes' element = {<DataRoutes />} />
                <Route path='/monitoring' element = {<Monitoring />} />
                <Route path='/new_pipeline' element = {<NewPipeline />} />
                <Route path='/settings' element = {<Settings />} />

                <Route path='/template' element = {<CreateTemplate />} />
                <Route path='/route/*' element = { <CreateDataRoute /> } />
              </Routes>
              <StorageCleaner />
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
