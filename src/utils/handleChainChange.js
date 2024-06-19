export const handleChainChange = async(setState)=>{
    const chainIdChange = await window.ethereum.request({
        method:"eth_chainId"
    })
    const chainId = parseInt(chainIdChange, 16)
    // console.log(chainIdChange)
    setState(prevState=> ({...prevState, chainId}))
}