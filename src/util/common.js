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

export function validateEstimate(value) {
  let err;
  if(!/^ *([0-9]+(mo|month|months))? *([0-9]+(w|week|weeks))? *([0-9]+(d|day|days))? *([0-9]+(h|hour|hours))? *([0-9]+(m|minute|minutes))? *$/i.test(value)) {
    err = 'Invalid estimate time'
  }
  return err
}
