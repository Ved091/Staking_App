import {useState,useRef,useContext} from 'react'
import Web3Context from '../../context/Web3Context'
import Button from '../Button'
import {ethers} from "ethers"
const TokenApproval = () => {
    const approveTokenRef = useRef()
    const [transactionStatus, setTransactionStatus] = useState("")
    const {stakingTokenContract,stakingContract} = useContext(Web3Context)
    const approveToken = async(e)=>{
        e.preventDefault();
        const amount = approveTokenRef.current.value.trim()
        if(isNaN(amount)|| amount<=0){
            console.error('Invalid amount')
            return;
        }
        const amountToSend = String(ethers.parseUnits(amount,18))
        try {
            const transaction = await stakingTokenContract.approve(stakingContract.target, amountToSend)
            setTransactionStatus("Transaction Pending");
            const receipt = await transaction.wait();
            if(receipt.status === 1){
                setTransactionStatus("Transaction Complete")
                setTimeout(()=>{
                    setTransactionStatus("")
                },5000)
                approveTokenRef.current.value = ""
            }else{
                setTransactionStatus("Transaction Failed")
            }
            // console.log(transaction)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {transactionStatus && <div>{transactionStatus}</div>}
        <form onSubmit={approveToken}>
            <label>Token Approval</label>{" "}
            <input type='text' ref={approveTokenRef}/>
            <Button onClick={approveToken} type="submit" label="Token Approve"/>

        </form>
    </div>
  )
}

export default TokenApproval