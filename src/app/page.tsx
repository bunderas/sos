'use client'
import { useState } from "react";
import ContentHolder from "./ContentHolder";
import ResponsiveAppBar from "./ResponsiveAppBar";


export default function MainPage(){
  const [content, setContent] = useState("home")
  function handleTitleChange(id:string) {
    console.log('app/page.tsx [10] :: id : ', id)
    setContent(id)
  }
  return (
    <>
    <ResponsiveAppBar menuCallback={handleTitleChange}/>
    <ContentHolder playerId={content}/>
    </>
  )
}