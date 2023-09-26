import axios from 'axios'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'

const Home = () => {

  const getData = async() =>{
    try {
      const res = await axios.post("http://localhost:8000/api/user/get-user-info-by-id", {},{
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() =>{
    getData();
  }, [])

  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  )
}

export default Home