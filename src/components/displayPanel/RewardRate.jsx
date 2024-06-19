import {useState, useEffect, useContext} from 'react'
import Web3Context from '../../context/Web3Context'
import {ethers} from "ethers"
const RewardRate = () => {
    const [rewardRate, setRewardRate] = useState("0")
    const {stakingContract} = useContext(Web3Context)
    useEffect(()=>{
        const fetchRewardRate = async()=>{
            const rewardR = await stakingContract.REWARD_RATE()
            const rewardRa = ethers.formatUnits(rewardR)
            setRewardRate(rewardRa)
        }
        fetchRewardRate()
    },[stakingContract])
  return (
    <div>
        Reward Rate: {rewardRate} token/sec
    </div>
  )
}

export default RewardRate