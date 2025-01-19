'use server'

import axios from "axios"
import { cookies } from "next/headers"

export const getAllExams = async () => {
  try {
    const token = cookies().get('ecommerce_token')?.value
    if(!token) {
      throw new Error('Token not found')
    }
    const response = await axios.get('https://exam.elevateegy.com/api/v1/subjects',{
      headers: {
        token: `${token}`
      }
    })
    console.log('ds')
    return response.data
  }catch(error) {
    console.error(error)
  }
}


export const getExamBySubject = async (id : string) => {
  try {
    const token = cookies().get('ecommerce_token')?.value
    if(!token) {
      throw new Error('Token not found')
    }
    const response = await axios.get(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`,{
      headers: {
        token: `${token}`
      }
    })
    return response.data
  }catch(error) {
    console.error(error)
    // throw new Error('Error')
  }
}

export const getQuestionsBySubject = async (id : string) => {
  try {
    const token = cookies().get('ecommerce_token')?.value
    if(!token) {
      throw new Error('Token not found')
    }
    const response = await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`,{
      headers: {
        token: `${token}`
      }
    })
    return response.data
  }catch(error) {
    console.log(error)
  }
}