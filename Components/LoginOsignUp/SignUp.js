import React, {useState,useEffect} from 'react'
import './LS.css'
import satyam from '../../Assets/images/satyameva_javathe.png'
import { Functions } from '../../Utils/Functions'
import {useNavigate} from 'react-router-dom'
import { getAuth, signInWithPhoneNumber,RecaptchaVerifier } from "firebase/auth";
import { doc, setDoc,getFirestore } from "firebase/firestore";

function SignUp() {
  const navigate = useNavigate()
  const [Name, setName] = useState()
  const [Phone, setPhone] = useState()
  const [Date, setDate] = useState()
  const [Adhaar, setAdhaar] = useState()
  const [Email, setEmail] = useState()
  const [Verify, setVerify] = useState(true)
  const [PassWord, setPassWord] = useState()
  const [Captcha, setCaptcha] = useState()
  const [ConfirmPassword, setConfirmPassword] = useState()
   const [Code, setCode] = useState()
   const auth = getAuth();
   const db = getFirestore();
   
 

   
  
    const generateRecaptcha = async()=>{
      console.log("Generating capctha")
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-verifier',{
        'size': 'visible',
        'callback': (response) => {
          console.log("ReCaptcha",response )
         
        },'expired-callback': () => {
          console.log("Error: expired-callback")
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth)
    }

    const requestOtp =async (e)=>{
      let appVerifier = window.recaptchaVerifier;
      let number = "+91 " + Phone
      signInWithPhoneNumber(auth, number,appVerifier).then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        
        console.log("Sms Send")
        window.confirmationResult = confirmationResult;
        setVerify(false)
        // ...
      }).catch((error) => {
        console.log("Error:", error)
       console.log("Error")
      });

    }

  const handleSubmit = async()=>{
    if(Name==null||Phone==null||Date==null||Email==null||PassWord==null||ConfirmPassword==null) return alert('Please Fill Up Completly To Proceed')
    if(PassWord!==ConfirmPassword) return alert('PassWords Does Not Match')
    if(!Functions.isOlderThan18(Date))  return alert('You Should Above 18 years old to Vote')
    console.log("Button Clicked")
     generateRecaptcha()
     await requestOtp()
    
  }

  

 const verifyOtp =()=>{
    window.confirmationResult.confirm(Code).then(async(result) => {
      const user = result.user;
      console.log(user)
      await setDoc(doc(db, "users",Email), {
        name: Name,
        phone:Phone,
        email:Email,
        password:PassWord,
        adhaar:Adhaar,
        voted: false,
        uid:user.uid
      });
      navigate("/")
      alert("SignUp Succeful")
    }).catch((error) => {
         alert(error)
    });
    console.log("Verified")
}


  return (
  <div className='home'>
  <div className='home_main'>
    <div className='satyam'>
    <img className='satyam_img' src={satyam}></img>
    </div>
    
    <div className='home_Welcome'> SignUp to Adhaar Voting</div>

    {
      Verify? <div  className='home_main'>
      <input className='in_1' placeholder='Full Name' onChange={(e)=>setName(e.target.value)}></input>
      <input className='in_1' placeholder='Phone Number' type='number' onChange={(e)=>setPhone(e.target.value)}></input>
      <input className='in_1' placeholder='Adhaar Number' type='number' onChange={(e)=>setAdhaar(e.target.value)}></input>
      <input className='in_1' placeholder='Email Address' type='email' onChange={(e)=>setEmail(e.target.value)}></input>
      <input className='in_1' type='date' placeholder='Date Of Birth' onChange={(e)=>setDate(e.target.value)}></input>
      <input className='in_1' placeholder='PassWord' type='password' onChange={(e)=>setPassWord(e.target.value)}></input>
      <input className='in_1' placeholder='Confirm PassWord' type='password' onChange={(e)=>setConfirmPassword(e.target.value)}></input>
      <div id='recaptcha-verifier' className='captcha'></div>
      <div className='bt_1' onClick={()=>handleSubmit()}>Get OTP</div>
      <div className='bt_2'  id='captcha'>Login</div>
    </div>
    : 
    <div  className='home_main'>
         <input className='in_1' placeholder='OTP' onChange={(e)=>setCode(e.target.value)}></input>
         <div className='bt_1' onClick={()=>verifyOtp()}  >Verify</div>
    </div>
    }
   
  
  </div>
 
   </div>
  )
}

export default SignUp