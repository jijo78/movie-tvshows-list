export const fetchData = (url: string): Promise<any> => fetch(url).then((res) => res.json())
