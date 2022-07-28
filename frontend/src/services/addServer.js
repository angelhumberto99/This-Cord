import { URL, HEADER_JSON } from './config'

const addServer = async(args) => {
  try {
    await fetch(`${URL}/servers/add`, {
      method:'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(args)
    })
  } catch (err) {
    console.log(err)
  }
}

export default addServer