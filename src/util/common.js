import { format } from 'date-fns'

export function formatToFE(date_string) {
  const data = date_string.split('/')
  const day = data[0]
  const month = data[1]
  const year = data[2]
  return year + '-' + month + '-' + day
}

export function formatToBE(date_string) {
  return format(new Date(date_string), 'dd/MM/yyyy')
}
