
const Parameter = ({ title, children }) => {
  return (
    <div className="text-sm font-normal">
      <span className="font-medium text-blue">{title}</span> {children}
    </div>
  )
}

export default Parameter;