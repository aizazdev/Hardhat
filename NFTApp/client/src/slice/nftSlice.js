import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ethers } from "ethers";
import NFTAbi from '../build/NFTApp.json';

export const initWeb3 = createAsyncThunk(
    'InitWeb3',
    async(data, thunkApi)=> {
        try {
            if(ethers.providers) {

                const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(nftAddress, NFTAbi.abi, provider);
                const nftWithsigner = contract.connect(signer);
                
                return {
                    contract,
                    signer,
                    nftWithsigner
                }
    
            } else {
                console.log("error in web3  ");
            }
        } catch(error) {
            console.log("Error in loading blockchain");
        }
    }
);

export const counterSlice = createSlice({
  name: 'counter',
    initialState: {
        contract: null,
        signer: null,
        nftWithsigner: null,
        address: null,
        count: null,
        loading: false,
        loading2: false,
        list: [],
    },
    reducers: {
        
    },
    extraReducers: {
        [initWeb3.fulfilled]: (state, action) => {
            state.contract = action.payload.contract;
            state.signer = action.payload.signer;
            state.nftWithsigner = action.payload.nftWithsigner;
        },
    }
})

export default counterSlice.reducer