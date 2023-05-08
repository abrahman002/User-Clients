import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])



  useEffect(()=>{
    fetch('http://localhost:500/user')
    .then(res => res.json())
    .then(data =>setUsers(data))
  },[])

  const handleAddUser=event=>{
    

    const from=event.target;
    const name=from.name.value;
    const email=from.email.value;
      
    const users={name,email}
    console.log(users)
      fetch('http://localhost:500/user',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(users)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
           const newUser=[...users,data]
           setUsers(newUser)
      })
      from.reset()
  }

  return (
    <>
      
      <h1>User ManegMent Systems</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <p>All User in Systems:{users.length}</p>
      {
        users.map(user=><p key={user.id}>{user.id}.{user.name}: {user.email}</p>)
      }
     
    </>
  )
}

export default App
