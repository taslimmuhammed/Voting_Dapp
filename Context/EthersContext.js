import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { ABI } from "../Utils/abi";

export const EthersContext = createContext(null);
const { ethereum } = window
export default function Ethers({ children }) {

  const contractAddress = "0x3C879f42cfdA54C92ba19fb9B5aad70a6b3675e6"
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isBought, setisBought] = useState(false)
  const [Connected, setConnected] = useState(false)
  const [EmailId, setEmailId] = useState()
  const [EV, setEV] = useState(false)
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        setConnected(true)
      } else {
        
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };



  const getVote = async () => {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, ABI, signer)
      const tx = await contract.getVotes(0);
      const tx1 = await contract.getVotes(1);
      const tx2 = await contract.getVotes(2);
      const tx3 = await contract.getVotes(3);
      const y0 = parseInt(tx, 16);
      const y1 = parseInt(tx1, 16);
      const y2 = parseInt(tx2, 16);
      const y3 = parseInt(tx3, 16);
      
      const arr = [y0, y1,y2,y3]
     return arr;
    }
    catch (e) {
      console.log(e)
    }
  }

  const checkOwner = async () => {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, ABI, signer)
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      let account = accounts[0]
      let tx = await contract.owner()
      if (tx.toUpperCase()===account.toUpperCase() ){
        console.log("Verified")
        return true}
      else{
        console.log("Not Verified");
        return false}
    } catch (e) {
      console.log(e)
    }
  }
  const VoteCandidate = async (index) => {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, ABI, signer)
      const vote =await contract.Vote(index)
       console.log(vote)
       await vote.wait()
      if(vote) alert ("Your Vote have Succefully been recorded to blockchain")
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);


  return (
    <EthersContext.Provider value={{ connectWallet, currentAccount, checkIfWalletIsConnect, getVote, isBought, checkOwner, Connected,VoteCandidate , EmailId, setEmailId,EV, setEV,VoteCandidate}}>
      {children}
    </EthersContext.Provider>
  )
}
