import { createSlice } from "@reduxjs/toolkit";



const initialState={
    showAlbum:false,
    artistAlbums:[],
    playlist:[]
}

const homeSlicer=createSlice({
    name:"homeSlicer",
    initialState,
    reducers:{
        setShowAlbum(state){
            state.showAlbum=!state.showAlbum
        },
        setArtistAlbum(state,action){
            state.artistAlbums=action.payload
        },
        setPlayList(state,action){
            state.playlist=action.payload
        }
    }
})


export const {setShowAlbum,setArtistAlbum,setPlayList}=homeSlicer.actions
export default homeSlicer.reducer