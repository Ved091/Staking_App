import {useState, useEffect, useContext} from 'react'
import Web3Context from '../../context/Web3Context'
import StakingContext from '../../context/StakingContext'
import {ethers} from "ethers"
const StakedAmount = () => {
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    const [stakedAmount, setStakedAmount] = useState("0")
    const {isReload} = useContext(StakingContext);
    useEffect(()=>{
        const fetchStakedBalance = async()=>{
            try{
                const amountStakedInWei = await stakingContract.stakedBalance(selectedAccount);
                // console.log(amountStaked)
                const amountStakedInEth = ethers.formatUnits(String(amountStakedInWei),18)
                setStakedAmount(amountStakedInEth)
            }catch(e){
                console.log(e)
            }
        }
        fetchStakedBalance()
    },[stakingContract,selectedAccount,isReload])
  return (
    <div>
        Staked Amount: {stakedAmount}
    </div>
  )
}

export default StakedAmount