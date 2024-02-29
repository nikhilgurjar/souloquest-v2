import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  isLoggedIn: false,
  tourCompany: null,
  tourCompany_id: null
};

const slice = createSlice({
  name: "tourCompany",
  initialState,
  reducers: {
    setLogIn(state, action) {
        state.isLoggedIn = !state.isLoggedIn;
      },
    setTourCompany(state, action){
        state.tourCompany = action.payload.tourCompany;
        state.tourCompany_id = action.payload.tourCompany?._id
    },
    logOut(state, action){
        state.isLoggedIn = false;
        state.tourCompany = null;
        state.tourCompany_id = null;
    }
  }
})

export const loginInCompany = ({ tourCompany }) =>{
    return async (dispatch, getState) => {
        dispatch(slice.actions.setLogIn());
        dispatch(slice.actions.setTourCompany({tourCompany}));
      };
}

export const {
    logOut,
    setTourCompany
} = slice.actions;

export default slice.reducer;