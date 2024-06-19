import {useContext} from 'react'
import Web3Context from '../context/Web3Context'
const ConnectedAccount = () => {
    const {selectedAccount} = useContext(Web3Context)
    // console.log(selectedAccount)
  return (
    <div>ConnectedAccount: {selectedAccount}</div>
  )
}

export default ConnectedAccount