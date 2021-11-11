import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import counter from './slice/nftSlice';
import {initWeb3} from './slice/nftSlice';
import { ethers } from "ethers";
import Moralis from 'moralis';

function App() {
    
  useEffect(async () => {
    dispatch(initWeb3());
  }, []);

  const {contract, signer, nftWithsigner} = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
        hello
        <button onClick={()=> info()}>GetiNFO</button>
    </div>
  )
}
export default App;