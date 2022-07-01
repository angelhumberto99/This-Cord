const MessageCard = ({children}) => {
  return (
    <div>{children.from}: {children.msg}</div>
  )
}

export default MessageCard