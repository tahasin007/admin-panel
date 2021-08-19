export const csvReader = (text) => {
  const user = []
  // let header = text.slice(0, text.indexOf('\n')).split(',')
  const rows = text.slice(text.indexOf('\n') + 1).split('\n')
  // header = header.slice(0, 3)
  rows.forEach((row,index) => {
    row = row.split(',')
    let isEmail = false
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (emailPattern.test(row[2])) {
      isEmail = true
    }
    if (isEmail && row[0] && row[1]) {
      user.push({
        id:index,
        firstName: row[0],
        lastName: row[1],
        emailAddress: row[2],
      })
    }
  })
  console.log(user)
  return user
}

export const validTypes = [
  'text/csv',
  '.csv',
  'application/vnd.ms-excel',
  'application/csv',
  'text/comma-separated-values',
  'text/x-csv',
  'text/x-comma-separated-values',
]

export const fileSize = (size) => {
  if (size === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(size) / Math.log(k))
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const dragOver = (e) => {
  e.preventDefault()
}

export const dragEnter = (e) => {
  e.preventDefault()
}

export const dragLeave = (e) => {
  e.preventDefault()
}

export const validateFile = (file) => {
  if (validTypes.indexOf(file.type) === -1) {
    return false
  }
  return true
}
