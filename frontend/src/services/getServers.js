import { URL } from './config'

const getServers = async() => {
  try {
    const res = await fetch(`${URL}/servers`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export default getServers