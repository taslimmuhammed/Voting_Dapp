import React, {useState, useContext} from 'react'
import {EthersContext} from '../../Context/EthersContext'
import satyam from '../../Assets/images/satyameva_javathe.png'
import "./Home.css"
import {useNavigate} from 'react-router-dom'
import { getFirestore,doc, getDoc } from 'firebase/firestore'
import VotePage from '../../Pages/VotingPage'
import Loading from '../Loading/Loading'
function Home() {
  const {setEmailId,EV, setEV} = useContext(EthersContext)
  const navigate = useNavigate()
  const db = getFirestore();
  const [Email, setEmail] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [Password, setPassword] = useState()
  const handleClick=async()=>{
    const docRef= doc(db, "users",Email);
    
    getDoc(docRef).then(docSnap=>{
      const data = docSnap.data();
      setEmailId(Email)
     if(Password===data.password){
       console.log("Verified", EV)
       console.log(setEV)
       setEV(true)
     }
    })
  }
  return (
  <div>{
      !EV?
<div className='home'>
  <div className='home_main'>
    <div className='satyam'>
    <img className='satyam_img' src={satyam} onClick={()=>navigate('/admin')}></img>
    </div>
    
    <div className='home_Welcome'> Welcome to Adhaar Voting</div>

    <input className='in_1' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
    <input className='in_1' placeholder='Password' type='password' onChange={(e)=>setPassword(e.target.value)}></input>
    <div className='bt_1' onClick={()=>{handleClick()}}>Login</div>
    <div className='bt_2' onClick={()=>navigate('/signup')}>Sign Up</div>
  </div>
   </div>:<VotePage></VotePage>
  }
   </div>
  )
}

export default Home