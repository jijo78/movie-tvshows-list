import dayjs from 'dayjs'

export const formatDate = (d: string) => dayjs(d).format('D MMM YYYY')
export const formatDateUK = (d: string) => dayjs(d).format('DD MMM YYYY')
export const currentYear = () => dayjs().year()
