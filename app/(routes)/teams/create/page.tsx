'use client'
import React, { useState } from 'react'
import k from '@/logo.jpg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'



function CreateTeam  () {

  const [teamName,setTeamName]=useState('');
  const createTeam=useMutation(api.teams.createTeam);
  const {user}:any=useKindeBrowserClient();
  const router=useRouter();

  const createNewTeam=()=>{
    createTeam({
      teamName:teamName,
      createdBy:user?.email
    }).then(resp=>{
      console.log(resp);
      if(resp)
      {
          router.push('/dashboard')
          toast('Team created successfully!!!')
      }
    })
  }

  return (
    <div className='p-6  md:p-16 my-16 flex flex-col items-center mt-8 '>

        <Image src={k} alt="logo " height='200' width='200' />
<h2 className='text-[20px] md:text-[40px] font-bold py-3 flex flex-col items-center mt-8'>Give name for your Group</h2>
<h2 className='text-[12px] text-gray-500 flex flex-col items-center'>You can Edit Name later from Setting</h2>
     
     <div className='w-[40%] mt-8 flex flex-col items-center'>
      <label className=''>Group Name</label>
       <Input type='text' placeholder='Group Name' className=' border-2  border-indigo-400 '
       onChange={(e)=>setTeamName(e.target.value)}
       />
     <Button className='bg-blue-500 rounded-md mt-7 hover:bg-blue-800'
     onClick={()=>createNewTeam()}
     disabled={!(teamName&&teamName.length>0)}
     >Create Now</Button>
     </div>
     
    </div>


  )
}

export default CreateTeam