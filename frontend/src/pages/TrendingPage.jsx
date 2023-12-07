import React from 'react'
import CarouselComponent from '../components/CarouselComponent'
const url='https://newsapi.org/v2/top-headlines?country=In&apiKey=63ad2b1e940942df92a9bec4373642e3'
const TrendingPage = () => {
  return (
    <div><CarouselComponent url={url}/></div>
  )
}

export default TrendingPage