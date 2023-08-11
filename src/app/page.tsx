'use client'
import React from "react";
import {getdatafromvercel} from "./fetchingbooks/getdatafromvercel";
import { getAndPostData } from "./fetchingbooks/getdatafromvercel";
export default function Home() {

 
     //getAndPostData(3)
     getdatafromvercel([])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello World
   
    </main>
  );
}
