/**
 * All timestamps from the API are Unix epoch seconds (UTC).
 * These helpers convert them to IST (Asia/Kolkata, UTC+5:30) for display.
 */

export const epochToISTDate = (epoch: number | null | undefined): string => {
  if (!epoch) return '—'
  return new Date(epoch * 1000).toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric',
  })
}

export const epochToISTDateTime = (epoch: number | null | undefined): string => {
  if (!epoch) return '—'
  return (
    new Date(epoch * 1000).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short',
      year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    }) + ' IST'
  )
}

export const epochToRelative = (epoch: number | null | undefined): string => {
  if (!epoch) return '—'
  const diff = Math.floor(Date.now() / 1000) - epoch
  if (diff < 60)    return 'just now'
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return epochToISTDate(epoch)
}
