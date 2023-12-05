import React from 'react'
import NewsTile from '../components/NewsTile'
const url='https://newsapi.org/v2/top-headlines?country=In&apiKey=63ad2b1e940942df92a9bec4373642e3'
const TrendingPage = () => {
  return (
    <div><NewsTile url={url}/></div>
  )
}

export default TrendingPage