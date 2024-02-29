"use client";
import React from "react";
/* Core */
import { Provider } from "react-redux";
import { store } from "./store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';



/* Instruments */
export const ReduxProvider = (props) => {
    let persistor = persistStore(store);
return <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        {props.children}
        {/* </PersistGate> */}
        </Provider>;
};
