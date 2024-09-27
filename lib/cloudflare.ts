import COLOS from '../colo.json'

export function getWorkerLocation(ray: string) {
  const colo = ray?.split('-')[1] as keyof typeof COLOS
  return COLOS[colo] || colo
}
