import React, { useEffect, useState } from 'react'
import { FaUserAlt, FaRegTimesCircle, FaRegTrashAlt, FaRegSun, FaMoon } from 'react-icons/fa'
import stylesModule from '../rss/stylesModule'

const Main = ({ bright, changer }) => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [age, setAge] = useState('')
  const [message, setMessage] = useState('')
  const [del, setDel] = useState('')
  const [users, setUsers] = useState([])

  // RENDERER states
  const [userTable, setUserTable] = useState(false)
  
  // handler funcs
  const handlingSubmit = (e) => {
    e.preventDefault()

    let firstName = fname.charAt(0).toUpperCase() + fname.slice(1)
    let lastName = lname.charAt(0).toUpperCase() + lname.slice(1)

    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        fname: firstName,
        lname: lastName,
        age
      })
    })
    .then((response) => {
      if (response){
        setMessage('Registration complete')
        setFname('')
        setLname('')
        setAge('')
        handlingGet()
        setTimeout(() => {
          setMessage('')
        }, 2000)
      }
    }).catch(e => {
      console.log(e);
    })
  }

  const handlingGet = () => {
    fetch('http://localhost:4000/users')
    .then(response => response.json())
    .then(data => setUsers(data))
  }

  const handlingDelete = (e) => {
    const id = e.target.id

    fetch(`http://localhost:4000/users/${id}`, {
      method: 'DELETE'
    }).then(res => {
      return res.json()
    }).then(res => {
      handlingGet()
      setDel(res.message)
      setTimeout(() => {
        setDel('')
      }, 2000)
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    handlingGet()
  }, [])
  
  const handlingUserTable = () => {
    setUserTable(!userTable)
  }

  return (
    <main className={(userTable ? 'md:w-[780px]' : 'md:w-[390px]') + (bright ? ' border bg-white text-gray-700 shadow-md' : ' dark-card shadown-md') + ' w-[390px] md:w-[780px] px-11 pb-5 pt-6 flex-col flex md:flex-row rounded-md'}>

      <div className={(userTable ? 'md:w-1/2' : 'w-full') + ' mr-3'}>

        <div className={stylesModule.header}>
          <h1 className={stylesModule.title}>Register your name</h1>
          <div>
            <button onClick={changer} className={(bright ? 'bg-gray-800 text-white ' : 'bg-white text-black ') + ' p-2 rounded-md text-sm'}>{bright ? <FaMoon /> : <FaRegSun />}</button>
            <button onClick={handlingUserTable} className={(userTable ? 'bg-red-500' : 'bg-green-500') + ' ml-1 p-2 rounded-md text-white text-sm'}>{userTable ? <FaRegTimesCircle /> : <FaUserAlt />}</button>
          </div>
        </div>
        
        <form onSubmit={handlingSubmit} className={stylesModule.formStyle}>
          
          <div className='my-2'>
            <label htmlFor="fname">First name:</label>
            <input className={stylesModule.inputStyle} value={fname} onChange={e => setFname(e.target.value)} placeholder="Enter first name..." type="text" name="fname" id="fname" required />
          </div>

          <div className='my-2'>
            <label htmlFor="lname">Last name:</label>
            <input className={stylesModule.inputStyle} value={lname} onChange={e => setLname(e.target.value)} placeholder="Enter last name..." type="text" name="lname" id="lname" required />
          </div>

          <div className='my-2'>
            <label htmlFor="age">Age:</label>
            <input className={stylesModule.inputStyle} value={age} onChange={e => setAge(e.target.value)} placeholder="Enter your age..." type="number" name="age" id="age" required />
          </div>

          <div className='flex flex-row items-center'>
            <button type='submit' className={stylesModule.submitBtn}>Submit</button>
            { message && <p className={stylesModule.submitNotif}>{message}</p> }
          </div>
        </form>

      </div>
      
      {
        userTable && (
          <div className='md:w-1/2 ml-3'>
            <div className={stylesModule.header}>
              <h1 className={stylesModule.title}>Users</h1>
              { del && <p className={stylesModule.deleteNotif}>{del}</p> }
            </div>
            <div className={stylesModule.resultContainer}>
              { users.length === 0 && <p className={stylesModule.noData}>No users stored.</p> }
              { users.length > 0 && users.map(user => (
                  <div className={stylesModule.dataRow} key={user.id}>
                    <div className='w-[55%] px-2'>
                      <p className='font-medium'>Fullname:</p>
                      <p className='overflow-hidden'>{user.fname} {user.lname}</p>
                    </div>
                    <div className='w-[30%] px-2'>
                      <p className='font-medium'>Age:</p>
                      <p>{user.age} {user.age === 1 ? 'yr old' : 'yrs old'}</p>
                    </div>
                    <div className='w-[15%] flex justify-center items-center'>
                      <button onClick={handlingDelete} id={user.id} className={stylesModule.deleteBtn}><FaRegTrashAlt /></button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
      
    </main>
  )
}

export default Main