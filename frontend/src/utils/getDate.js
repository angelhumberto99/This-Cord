const getDate = () => {
    const today = new Date()
    return `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`
}

export default getDate