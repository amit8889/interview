import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import NavbarConponent from '../Navbar/NavbarComponenet'
import JoinInterview from '../JoinInteview/JoinInterview'
export const Home = () => {
  const group =[
    {
      key:1,
      name:"React",
      img:""
    },
    {
      key:2,
      name:"Javascript",
      img:""
    },
    {
      key:3,
      name:"Node",
      img:""
    },
    {
      key:4,
      name:"Express",
      img:""
    }
  ]
  return <>
  <NavbarConponent/>
     <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap',gap:10,marginTop: '11vh'}}>
     {
      group&& group.map(item=><Card key={item.key} item={item}/>)
     }

     
    </div>
  </>
}



 