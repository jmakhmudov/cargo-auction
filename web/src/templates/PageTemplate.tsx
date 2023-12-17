import React from "react"

const PageTemplate = ({ title, children }) => {
  return (
    <div>
      <h1
        className="pb-6 text-3xl"
      >{title}</h1>

      {children}
    </div>
  )
}

export default PageTemplate