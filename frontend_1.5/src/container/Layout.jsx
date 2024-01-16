import React from 'react'
import styled from "styled-components"
import { Routes, Route } from "react-router-dom"
import AppBarComponent from '../components/AppBarComponent'
import DrawerComponent from '../components/DrawerComponent'
import HelpSupport from "../pages/HelpSupport"
import SettingsPage from "../pages/SettingsPage"
import Scorecards from "../components/Scorecards";
import Leaderboard from "../components/LeaderBoard"
import DebateRoom from '../components/DebateRoom'
import DebateTopics from '../components/DebateTopics'
import QuizLandingPage from '../pages/QuizLandingPage'
import ActiveDebateRooms from '../components/ActiveDebateRooms'
import GettingStarted from '../pages/GettingStarted'
const Layout = () => {

  return (
    <Root>
      <AppBarComponent />
      <DrawerComponent />
      <main style={{ width: "100%" }}>
        <div className='content'>
          <Routes>
            <Route path='/getting-started' element={<GettingStarted />} />
            <Route path='/quiz/current-quiz' element={<QuizLandingPage />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/quiz/scorecards' element={<Scorecards />} />
            <Route path='/debate/debate-topics' element={<DebateTopics />} />
            <Route path='/debate/active-rooms' element={<ActiveDebateRooms />} />
            <Route path='/debate/debate-topics/:debateId' element={<DebateRoom />} />
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