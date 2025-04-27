import React from 'react'
import ContentLoader from 'react-content-loader'

const PlantLoader = () => (
  <ContentLoader 
    speed={2}
    width={800}
    height={800}
    viewBox="0 0 800 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    {/* Rectangle skeleton */}
    <rect x='0' y='50' rx='5' ry='5' width='800' height='50'/>
    <rect x="0" y="150" rx="5" ry="5" width="800" height="700" /> 
  </ContentLoader>
)

export default PlantLoader
