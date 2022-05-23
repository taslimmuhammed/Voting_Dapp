import React, {useContext} from 'react'
import {EthersContext} from '../Context/EthersContext'

function Connect() {
  const {connectWallet} = useContext(EthersContext)
  return (
    <div>
        <div className='connect_main'>
            <div className='connect_button' onClick={()=>{
              connectWallet()
            }}>Connect Wallet to proceed</div>
        </div>
    </div>
  )
}

export default Connect