
const Parameter = ({ title, children }) => {
  return (
    <div className="text-sm font-medium">
      <span className="text-gray font-normal">{title}</span> {children}
    </div>
  )
}

export default Parameter;