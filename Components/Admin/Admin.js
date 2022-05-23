import React, {useState,useEffect, useContext} from 'react'
import shivsena from '../../Assets/images/shiv.png'
import rsc from '../../Assets/images/rsc.png'
import cong from '../../Assets/images/cong.png'
import bjp from '../../Assets/images/bjp.png'
import satyam from '../../Assets/images/satyameva_javathe.png'
import { type } from '@testing-library/user-event/dist/type'
import './Admin.css'
import {EthersContext} from '../../Context/EthersContext'
import { doc, setDoc,getFirestore } from "firebase/firestore";
import { getStorage, ref,uploadBytes } from "firebase/storage";
import Loading from '../Loading/Loading'
import {useNavigate} from 'react-router-dom'

function AdminPage() {
    const [isLoading, setisLoading] = useState(false)
    const [Arr, setArr] = useState([0,0,0,0])
    const navigate = useNavigate()
    const db = getFirestore();
    const storage = getStorage();
    const {checkOwner, getVote} = useContext(EthersContext)
const checker = async()=>{
    setisLoading(true)
    try{
        const c=await checkOwner()
        if(!c){
            navigate('/')
            alert("Only Owner Can Access")
            return;
        }
        const res =  await getVote()
        console.log(res)
        setArr(res)
    }
        catch(e){
     console.log(e)
        }
    setisLoading(false)
}
    useEffect(() => {
       checker()
    }, [])
    
// const handleSubmit = async()=>{
//     if(Party==null||CName==null||Symbol==null) return(alert("Please fill up completly"))
//     const storageRef = ref(storage, Symbol.name);
//     console.log(Symbol.name,Symbol)
//     const add = await uploadBytes(storageRef, Symbol)
//     console.log(add)
// }
    
  return (
      isLoading?<Loading></Loading>:
    <div className='vote_main'>
    <main>
    <nav style={{height:120}}>
        <div className="nav-wrapper">
            <img  alt="" height="100" src={satyam} />

            <div className="brand-logo center"><h3 style={{color: 'black'}}>Election Commission Of India</h3></div>

        </div>
    </nav>
  </main>

<main className='bottom_main'>
   
  

        <div className="container">
            <div className='h1'>
            <table>
                

                    <thead>
                    <tr>
                        <th>Election Symbol</th>
                        <th>Party</th>
                        <th>Candidate Name</th>
                        <th>Votes</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>

                        <td><img alt=" " height="42" src={bjp} width="42" /></td>
                        <td>Bharatiya Janata Party</td>
                        <td id="cand1">Ms Shrimoyee</td>
                        <td>
                            <div>{Arr[0]}</div>
                        </td>
                    </tr>
                    <tr>
                        <td><img alt=" " height="42" src={cong} width="42" /></td>
                        <td>Indian National Congress</td>
                        <td id="cand2">Mr Umesh</td>
                        <td>
                            <div>{Arr[1]}</div>
                        </td>
                    </tr>
                    <tr>
                        <td><img alt=" " height="42" src={rsc} width="42" /></td>
                        <td>Nationalist Congress Party</td>
                        <td id="cand3">Mr Vipul</td>
                        <td>
                            <div>{Arr[2]}</div>
                        </td>
                    </tr>
                    <tr>
                        <td><img alt=" " height="42" src={shivsena} width="42" /></td>
                        <td>Shiv Sena</td>
                        <td id="cand4">Mr Sudeep</td>
                        <td>
                            <div>{Arr[3]}</div>
                        </td>
                    </tr></tbody>
                
            </table></div>
     {/* <div className='Add_head'>Add Candidate</div>
        <div className='Add'>
        <input className='in_1' placeholder='Party Name' onChange={(e)=>setParty(e.target.value)}></input>
        <input className='in_1' placeholder='Candidate Name'  onChange={(e)=>setCName(e.target.value)}></input>
        <input className='in_1' placeholder='Party Symbol'  onChange={(e)=>setSymbol(e.target.files[0])} type='file'></input>
        <div className='bt_1' onClick={()=>handleSubmit()}> Submit</div>
        </div> */}
        </div>
         
</main>
</div>
  )
}

export default AdminPage