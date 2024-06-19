import {useState,useRef,useContext} from 'react'
import Web3Context from '../context/Web3Context'
import StakingContext from '../context/StakingContext'
import Button from './Button'
import {ethers} from "ethers"
const WithdrawToken = () => {
    const withdrawAmountRef = useRef()
    const [transactionStatus, setTransactionStatus] = useState("")
    const {stakingContract} = useContext(Web3Context)
    const {isReload, setIsReload} = useContext(StakingContext)
    const withdrawToken = async(e)=>{
        e.preventDefault()
        const amount = withdrawAmountRef.current.value.trim();
        if(isNaN(amount)|| amount<=0){
            console.error('Invalid amount')
            return;
        }
        const amountInWei = String(ethers.parseUnits(amount,18));
        try {
            const transaction = await stakingContract.withdrawStakedTokens(amountInWei)
            setTransactionStatus("Withdrawing the Tokens")
            const receipt = await transaction.wait();
            if(receipt.status === 1){
                setTransactionStatus("Tokens successfully withdrawn")
                setIsReload(!isReload)
                setTimeout(()=>{
                    setTransactionStatus("")
                },5000)
                withdrawAmountRef.current.value = ""
            }else{
                setTransactionStatus("Unable to withdraw the amount")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {transactionStatus && <div>{transactionStatus}</div>}
        <form onSubmit={withdrawToken}>
            <label>Amount to Withdraw</label>
            <input type='text' ref={withdrawAmountRef}/>
            <Button onClick={withdrawToken} type="submit" label="Withdraw"/>
        </form> 
    </div>
  )
}

export default WithdrawToken