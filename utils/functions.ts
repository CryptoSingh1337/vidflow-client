export function formatNumberInInternationalSystem (n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function shortifyNumber (n: number): string {
  if (n < 999) {
    return String(n)
  } else if (n >= 1000 && n < 1000000) {
    return (n / 1000).toFixed(2) + 'K'
  } else if (n >= 1000000 && n < 1000000000) {
    return (n / 1000000).toFixed(2) + 'M'
  } else {
    return (n / 1000000000).toFixed(2) + 'B'
  }
}

export function capitalize (text: string): string {
  return `${text.substring(0, 1)}${text.substring(1).toLowerCase()}`
}

export function truncateText (text: string, size: number): string {
  if (text.length <= size) {
    return text
  }
  return `${text.substring(0, size)}...`
}

export function calculateRatio (likes: number, dislikes: number): number {
  if (likes === 0) {
    return 0
  }
  return Number(((likes / (likes + dislikes)) * 100).toFixed(2))
}
