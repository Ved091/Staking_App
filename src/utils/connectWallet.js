import {ethers} from "ethers"
import stakingAbi from "../ABI/stakingABI.json"
import stakingTokenAbi from "../ABI/stakeTokenABI.json"
export const connectWallet = async() => {
    try{
        let [signer, provider, stakingContract, stakingTokenContract, chainId] = [null]
        if(window.ethereum === null){
            throw new Error("Metamask is not installed");
        }
        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts"
        })
        let chainIdHex = await window.ethereum.request({
            method:"eth_chainId"
        })
        // console.log(chainIdHex)
        chainId = parseInt(chainIdHex,16);
        let selectedAccount = accounts[0];
        if(!selectedAccount){
            throw new Error("No ethereum account available")
        }
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
        const stakingContractAddress = import.meta.env.VITE_STAKING_CONTRACT_ADDRESS;
        const stakingTokenContractAddress = import.meta.env.VITE_STAKING_TOKEN_CONTRACT_ADDRESS;
        stakingContract = new ethers.Contract(stakingContractAddress,stakingAbi,signer)
        stakingTokenContract = new ethers.Contract(stakingTokenContractAddress,stakingTokenAbi,signer)
        // console.log(chainId)
        return {provider, selectedAccount,stakingContract,stakingTokenContract,chainId}
    }catch(e){
        console.log(e)
    }
}