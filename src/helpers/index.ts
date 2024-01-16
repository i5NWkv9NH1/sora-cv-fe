export async function delay(ms: number) {
  return new Promise((res, rej) => setTimeout(res, ms))
}
export function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16)
}
