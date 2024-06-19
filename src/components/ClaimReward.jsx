import {useState,useContext} from 'react'
import Web3Context from '../context/Web3Context'
import Button from './Button'
const ClaimReward = () => {
    const [transactionStatus, setTransactionStatus] = useState("")
    const {stakingContract} = useContext(Web3Context)
    
    const claimReward = async(e)=>{
        e.preventDefault()
        try {
            const transaction = await stakingContract.getReward();
            setTransactionStatus("Claiming the reward tokens");
            const receipt = await transaction.wait();
            if(receipt.status === 1){
                setTransactionStatus("Reward Tokens claimed");
                setTimeout(()=>{
                    setTransactionStatus("");
                },5000)
            }else{
                setTransactionStatus("Unable to claim the reward tokens");
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {transactionStatus && <div>{transactionStatus}</div>}
        <Button onClick={claimReward} type="button" label="Claim Reward"/>
    </div>
  )
}

export default ClaimReward