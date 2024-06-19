import {useState, useEffect} from 'react'
import {connectWallet} from '../utils/connectWallet'
import Web3Context from '../context/Web3Context'
import Button from './Button'
import { handleAccountChange } from '../utils/handleAccountChange'
import { handleChainChange } from '../utils/handleChainChange'
// eslint-disable-next-line react/prop-types
const Wallet = ({children}) => {
    const [state, setState] = useState({
        provider:null,
        selectedAccount:null,
        stakingContract:null,
        stakingTokenContract:null,
        chainId:null
    })
    const [loading, setLoading] =useState(false)
    useEffect(()=>{
        window.ethereum.on('accountsChanged',()=>handleAccountChange(setState))
        window.ethereum.on('chainChanged',()=> handleChainChange(setState))
        return()=>{
            window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setState))
            window.ethereum.removeListener('chainChanged',()=> handleChainChange(setState))
        }
    },[])
    const handleWallet = async()=>{
        try{
            setLoading(true)
            const {provider, selectedAccount,stakingContract,stakingTokenContract,chainId} = await connectWallet()
            setState({provider, selectedAccount,stakingContract,stakingTokenContract,chainId})
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }
  return (
    <>
    <Web3Context.Provider value={state}>
        {children}
    </Web3Context.Provider>
    {loading && (<div>Loading...</div>)}
    <Button onClick={handleWallet} label="Connect Wallet" type="button"/>
    </>
  )
}

export default Wallet