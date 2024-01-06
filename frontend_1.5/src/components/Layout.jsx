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
import DebatePage from '../components/DebatePage'
const Layout = () => {

  return (
    <Root>
      <AppBarComponent />
      <DrawerComponent />
      <main style={{ width: "100%" }}>
        <div className='content'>
          <Routes>
            <Route path="/" element={<TrendingPage />} />
            <Route path="/personalized" element={<PersonalizedPage />} />
            <Route path="/fact-check" element={<FactCheckPage />} />
            <Route path='/help-support' element={<HelpSupport />} />
            <Route path='/your-opinion' element={<OpinionPage />} />
            <Route path='/debate' element={<DebatePage />} />
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
        padding: 80px;
        overflowX: auto;
        overflowY: hidden;
    }
`
export default Layout