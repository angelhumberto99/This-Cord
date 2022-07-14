const getTextColor = bgColor => {
    const hexColor = parseInt(bgColor.replace('#', ''), 16)
    const rgbHalf = 0xffffff / 2
    if (!bgColor)
        return '#2f3136'
    return ( hexColor > rgbHalf) ? '#2f3136' : '#edffff'
}

export default getTextColor