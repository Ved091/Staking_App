import './App.css'
import Wallet from './components/Wallet'
import Navigation from './components/Navigation'
import DisplayPanel from './components/displayPanel/DisplayPanel'
import TokenApproval from './components/stakeToken/TokenApproval'
import StakeAmount from './components/stakeToken/StakeAmount'
import WithdrawToken from './components/WithdrawToken'
import ClaimReward from './components/ClaimReward'
// import StakingContext from './context/StakingContext'
import  { StakingProvider } from './context/StakingContext'
function App() {
  return (
    <>
      <Wallet>
        <Navigation/>
        <StakingProvider>
          <DisplayPanel/>
          <StakeAmount/>
          <WithdrawToken/>
        </StakingProvider>
        <TokenApproval/>
        <ClaimReward/>
      </Wallet>
    </>
  )
}

export default App
