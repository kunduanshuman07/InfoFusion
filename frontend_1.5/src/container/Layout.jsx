import React from 'react'
import styled from "styled-components"
import { Routes, Route } from "react-router-dom"
import AppBarComponent from '../components/AppBarComponent'
import DrawerComponent from '../components/DrawerComponent'
import TrendingPage from "../pages/TrendingPage"
import PersonalizedPage from "../pages/PersonalizedPage"
import FactCheckPage from "../pages/FactcheckPage";
import HelpSupport from "../pages/HelpSupport"
import OpinionPage from "../pages/OpinionPage"
import DebatePage from '../pages/DebatePage'
import PlaygroundPage from "../pages/PlaygroundPage"
import SettingsPage from "../pages/SettingsPage"
import Scorecards from "../components/Scorecards";
import Leaderboard from "../components/LeaderBoard"
import Quiz from '../components/Quiz'
import DebateRoom from '../components/DebateRoom'
const Layout = () => {

  return (
    <Root>
      <AppBarComponent />
      <DrawerComponent />
      <main style={{ width: "100%" }}>
        <div className='content'>
          <Routes>
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/personalized" element={<PersonalizedPage />} />
            <Route path='/playground' element={<PlaygroundPage/>}/>
            <Route path='/playground/quiz' element ={<Quiz />}/>
            <Route path='/playground/leaderboard' element ={<Leaderboard />}/>
            <Route path='/playground/scorecards' element ={<Scorecards />}/>
            <Route path='/debate' element={<DebatePage />} />
            <Route path='/debate/:debateId' element={<DebateRoom />} />
            <Route path='/your-opinion' element={<OpinionPage />} />
            <Route path="/fact-check" element={<FactCheckPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/help-support' element={<HelpSupport />} />
          </Routes>
        </div>
      </main>
    </Root>
  )
}
const Root = styled.div`
display: flex;
    .content{
        flexGrow: 1.5;
        padding: 70px;
        overflowX: auto;
        overflowY: hidden;
    }
`
export default Layout