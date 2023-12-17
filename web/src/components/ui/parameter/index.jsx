
const Parameter = ({ title, children }) => {
  return (
    <div className="text-sm flex gap-1">
      <div className="text-gray">{title}</div>
      <div className=" font-medium">{children}</div>
    </div>
  )
}

export default Parameter;