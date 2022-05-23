import React, {useState, useContext, useEffect} from 'react'
import shivsena from '../../Assets/images/shiv.png'
import rsc from '../../Assets/images/rsc.png'
import cong from '../../Assets/images/cong.png'
import bjp from '../../Assets/images/bjp.png'
import satyam from '../../Assets/images/satyameva_javathe.png'
import './Vote.css'
import Loading from '../Loading/Loading'
import {EthersContext} from '../../Context/EthersContext'
import { doc,getDoc,getFirestore,updateDoc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'

function Vote() {
const [isLoading, setisLoading] = useState(false)
const {VoteCandidate, EmailId,EV, setEV} = useContext(EthersContext)
const navigate = useNavigate()
const db = getFirestore();


useEffect(() => {
  setisLoading(true)
  
  const docRef = doc(db, "users", EmailId);
  getDoc(docRef).then(async(docSnap)=>{
   const data = docSnap.data()
   console.log(data)
   if(data.voted){
       navigate('/')
       alert("You have already marked your vote")
       console.log("Voted")
       setEV(false)
   }else{
       alert("Mark your Vote with care")
       console.log("Voting...")
       setisLoading(false)
   }
  })
}, [])

const handleClick = async(index)=>{
    setisLoading(true)
    try{
    const washingtonRef = doc(db, "users", EmailId);
     await updateDoc(washingtonRef, {voted:true});
     const res = await VoteCandidate(index)
    }catch(e){
    console.log(e)
    }
    setEV(false)
    alert("Voting Succefull")
    setisLoading(false)

}
  return (
    isLoading ? <Loading/> :
    <div className='vote_main'>
    <man>
    <nav style={{height:120}}>
        <div className="nav-wrapper">
            <img  alt="" height="100" src={satyam} />

            <div className="brand-logo center"><h3 style={{color: 'black'}}>Election Commission Of India</h3></div>

        </div>
    </nav>
  </man>

<main className='bottom_main'>
   
  

        <div className="container">
            <div className="card_light_blue" id="card-alert">
                <div className="card-content light-blue-text">
                    <p id="loc_info">Location Based on Adhaar : Unverified.</p>
                </div>
            </div>
            <div className='h1'>
            <table>
                

                    <thead>
                    <tr>
                        <th>Election Symbol</th>
                        <th>Party</th>
                        <th>Candidate Name</th>
                        <th>Vote</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>

                        <td><img alt=" " height="42" src={bjp} width="42" /></td>
                        <td>Bharatiya Janata Party</td>
                        <td id="cand1">Ms Shrimoyee</td>
                        <td>
                            <button className="btn waves-effect waves-light" id="vote1"  onClick={()=>handleClick(0)}>Vote
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><img alt=" " height="42" src={cong} width="42" /></td>
                        <td>Indian National Congress</td>
                        <td id="cand2">Mr Umesh</td>
                        <td>
                            <button className="btn waves-effect waves-light" id="vote2"  onClick={()=>handleClick(1)}>Vote

                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><img alt=" " height="42" src={rsc} width="42" /></td>
                        <td>Nationalist Congress Party</td>
                        <td id="cand3">Mr Vipul</td>
                        <td>
                            <button className="btn waves-effect waves-light" id="vote3"  onClick={()=>handleClick(2)}>Vote

                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><img alt=" " height="42" src={shivsena} width="42" /></td>
                        <td>Shiv Sena</td>
                        <td id="cand4">Mr Sudeep</td>
                        <td>
                            <button className="btn waves-effect waves-light" id="vote4" onClick={()=>handleClick(3)}>Vote

                            </button>
                        </td>
                    </tr></tbody>
                
            </table></div>
        </div>
</main>
</div>
  )
}

export default Vote