import {useState,useRef,useContext} from 'react'
import Web3Context from '../../context/Web3Context'
import StakingContext from '../../context/StakingContext'
import Button from '../Button'
import {ethers} from "ethers"
const StakeAmount = () => {
    const stakeAmountRef = useRef()
    const {isReload, setIsReload} = useContext(StakingContext)
    const [transactionStatus, setTransactionStatus] = useState("")
    const {stakingContract} = useContext(Web3Context)
    const stakeToken = async(e)=>{
        e.preventDefault()
        const amount = stakeAmountRef.current.value.trim();
        if(isNaN(amount)|| amount<=0){
            console.error('Invalid amount')
            return;
        }
        const amountInWei = String(ethers.parseUnits(amount,18));
        try {
            const transaction = await stakingContract.stake(amountInWei)
            setTransactionStatus("Staking the tokens")
            const receipt = await transaction.wait();
            if(receipt.status === 1){
                setTransactionStatus("Tokens successfully staked")
                setIsReload(!isReload)
                setTimeout(()=>{
                    setTransactionStatus("")
                },5000)
                stakeAmountRef.current.value = ""
            }else{
                setTransactionStatus("Unable to stake the amount")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {transactionStatus && <div>{transactionStatus}</div>}
        <form onSubmit={stakeToken}>
            <label>Amount to Stake</label>
            <input type='text' ref={stakeAmountRef}/>
            <Button onClick={stakeToken} type="submit" label="Stake"/>
        </form>  
    </div>
  )
}

export default StakeAmount