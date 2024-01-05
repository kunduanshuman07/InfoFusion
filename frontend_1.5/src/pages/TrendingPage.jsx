import React from 'react'
import NewsTile from '../components/NewsTile'
import styled from 'styled-components'
const url='https://newsapi.org/v2/top-headlines?country=In&apiKey=63ad2b1e940942df92a9bec4373642e3'
const TrendingPage = () => {
    return (
    <Root>
            <NewsTile url={url}/>
    </Root>
  )
}
const Root = styled.div`

`
export default TrendingPage