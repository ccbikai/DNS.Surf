import COLOS from '../colo.json'

export async function getWorkerLocation() {
  const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace')
  const text = await res.text()

  const colo = /^colo=(.*)$/m.exec(text)?.[1] as keyof typeof COLOS
  return COLOS[colo] || { country: '', location: '', colo: '' }
}
