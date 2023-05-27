import { format } from 'date-fns'

export function formatToFE(date_string) {
  if (date_string === undefined) {
    return date_string
  }
  const data = date_string.split('/')
  const day = data[0]
  const month = data[1]
  const year = data[2]
  return year + '-' + month + '-' + day
}

export function formatDate(date_string) {
  const formatToFe = formatToFE(date_string)
  const date = new Date(formatToFe).toString().split(' ')
  return date.slice(1, 4).join(' ')
}

export function formatToBE(date_string) {
  return format(new Date(date_string), 'dd/MM/yyyy')
}

export function simpleTimer(time) {
  if (time === undefined) {
    return time
  }
  return time.toLowerCase().replace('months', 'mo').replace('month', 'mo').replace('weeks', 'w').replace('week', 'w').replace('days', 'd').replace('day', 'd').replace('hours', 'h').replace('hour', 'h').replace('minutes', 'm').replace('minute', 'm').replace(' ', '')
}

export function convertToMinute(time) {
  let result = 0
  let splitMonth = time.split('mo')
  let splitWeek, splitDay, splitHour, splitMinute
  if (splitMonth[1] !== undefined) {
    const month = Number(splitMonth[0])
    result += (224 * 60 * month)
    splitWeek = splitMonth[1].split('w')
  } else {
    splitWeek = splitMonth[0].split('w')
  }

  if (splitWeek[1] !== undefined) {
    const week = Number(splitWeek[0])
    result += (56 * 60 * week)
    splitDay = splitWeek[1].split('d')
  } else {
    splitDay = splitWeek[0].split('d')
  }

  if (splitDay[1] !== undefined) {
    const day = Number(splitDay[0])
    result += (8 * 60 * day)
    splitHour = splitDay[1].split('h')
  } else {
    splitHour = splitDay[0].split('h')
  }

  if (splitHour[1] !== undefined) {
    const hour = Number(splitHour[0])
    result += (60 * hour)
    splitMinute = splitHour[1].split('m')
  } else {
    splitMinute = splitHour[0].split('m')
  }

  if (splitMinute[1] !== undefined) {
    const minute = Number(splitMinute[0])
    result += minute
  }

  return result
}

export function timeTracking(spend, estimate) {
  if (spend === undefined) {
    return 0
  }
  spend = simpleTimer(spend)
  estimate = simpleTimer(estimate)
  const spendMinute = convertToMinute(spend)
  const estimateMinute = convertToMinute(estimate)
  // console.log(spendMinute, estimateMinute);
  return ((spendMinute * 1.0) / (estimateMinute * 1.0) * 100)

}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertToPercentText(number) {
  return Math.round(number * 100) + '%'
}

export function convertToPercent(number) {
  return Math.round(number * 100)
}

// data = {
//   labels,
//   datasets: [
//     {
//       label: 'Expected',
//       data: [30, 60, 22, 7],
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//     {
//       label: 'Actual',
//       data: [27, 60, 25, 7],
//       backgroundColor: ['rgba(52, 199, 89, 0.5)', 'rgba(255, 69, 58, 0.5)', 'rgba(255, 69, 58, 0.5)', 'rgba(52, 199, 89, 0.5)'],
//     },
//   ],
// };

export function convertDataGraph(data) {
  const mapper = new Map()
  data.forEach((item, _) => {
    mapper.set(item.stage, {
      expected: item.expected,
      actual: item.actual,
      backgroundColor: item.expected <= item.actual ? 'rgba(52, 199, 89, 0.5)' : 'rgba(255, 69, 58, 0.5)'
    })
  })
  const result = {
    labels: Array.from(mapper.keys()),
    datasets: [
      {
        label: 'Expected',
        data: Array.from(mapper.values(), value => value.expected),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Actual',
        data: Array.from(mapper.values(), value => value.actual),
        backgroundColor: Array.from(mapper.values(), value => value.backgroundColor),
      },
    ],
  }
  return result
}
