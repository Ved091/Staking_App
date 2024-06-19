import {useState, useEffect, useContext} from 'react'
import Web3Context from '../../context/Web3Context'

import {ethers} from "ethers"
const EarnedReward = () => {
    const [earnedReward, setEarnedReward] = useState("0")
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    
    useEffect(()=>{
        const fetchEarnedAmount = async()=>{
            const rewardEarned = await stakingContract.earned(selectedAccount)
            const rewardEarnedInEth = ethers.formatUnits(rewardEarned)
            const rewardEarnedTerminated = parseFloat(rewardEarnedInEth).toFixed(2)
            setEarnedReward(rewardEarnedTerminated)
        }
        const interval = setInterval(()=>{
          stakingContract && fetchEarnedAmount()
        },1000)
        return ()=> clearInterval(interval)
    },[stakingContract,selectedAccount])
  return (
    <div>
        Reward Earned is {earnedReward}
    </div>
  )
}

export default EarnedReward