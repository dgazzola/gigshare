const cleanUserInput = (formInput) => {
  Object.keys(formInput).forEach((field) => {
    if (formInput[field] === "") {
      delete formInput[field]
    }
  })
  if (formInput?.date){
    const date = formInput.date
    const month = date[5]+date[6]+'-'
    const day = date[8]+date[9]+'-'
    const year = `${date[0]+date[1]+date[2]+date[3]}`
    formInput.date=month+day+year

  }
  return formInput
}

export default cleanUserInput