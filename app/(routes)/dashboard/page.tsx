'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import {LogoutLink} from '@kinde-oss/kinde-auth-nextjs/components'
import { useConvex, useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { createUser, getUser } from '@/convex/user'
import Header from './_components/Header'
import FileList from './_components/FileList'
const Dashboard = () => {

  const {user}:any=useKindeBrowserClient()
  // const getUser=useQuery(api.user.getUser,{email:user?.email})
const convex=useConvex();

const createUser=useMutation(api.user.createUser);
useEffect(()=>{
    if(user)
    {
      checkUser()
    }
},[user])


const checkUser=async()=>{
const result =await convex.query(api.user.getUser,{email:user?.email})
if(!result?.length)
  {
      createUser({
        name:user.given_name,
        email:user.email,
        image:user.picture
      }).then((resp)=>{
        console.log(resp)
      })
  }
}

  return (
    <div className='p-8'>
      {/* Dashboard */}
{/* <Button >
   <LogoutLink>Logout</LogoutLink>
</Button> */}
    <div>
      <Header/>
      <FileList/>

    </div>
    </div>

   
  )
}

export default Dashboard