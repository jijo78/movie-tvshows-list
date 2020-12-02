import dayjs from 'dayjs'

export const formatDateUK = (d: string) => dayjs(d).format('DD MMM YYYY')
export const formatDateUKYear = (d: string) => dayjs(d).format('YYYY')
