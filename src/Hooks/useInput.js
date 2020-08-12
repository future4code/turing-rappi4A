import React, {useState} from "react"

const useInput = (initialValues) => {
  const [form, setForm] = useState(initialValues)
  
  const onChange = (name, value) => {
      const newForm = {...form, [name]: value}
      setForm(newForm)
  }

  const resetaEntrada = () => {
      setForm(initialValues)
  }

  return {form, onChange, resetaEntrada}
}

export default useInput