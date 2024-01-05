import React from 'react'
import styled from "styled-components"
import {Routes, Route} from "react-router-dom"
import AppBarComponent from '../components/AppBarComponent'
import DrawerComponent from '../components/DrawerComponent'
import TrendingPage from "../pages/TrendingPage"
import PersonalizedPage from "../pages/PersonalizedPage"
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