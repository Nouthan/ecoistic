import React from 'react'
import AllCommunities from '../components/AllCommunities'
import TopUsers from '../components/TopUsers'
import Rank from "../components/Rank.jsx"
const Community = () => {
  return (
    <div className="community-container grid grid-cols-2 h-screen">
      <div className="left-col p-4 overflow-y-auto">
        <AllCommunities />
      </div>
      <div className="right-col p-4 grid grid-rows-2">
        <div className="top-users">
          <TopUsers />
        </div>
        <div className="track-position">
          <Rank />
        </div>
      </div>
    </div>
  )
}

export default Community