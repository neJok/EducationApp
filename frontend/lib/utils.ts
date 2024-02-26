let gradients = ['linear-gradient(128.66deg, rgb(156, 62, 152) 19.063%,rgb(170, 43, 248) 83.119%)', 'linear-gradient(128.66deg, rgb(62, 117, 156) 19.063%,rgb(109, 43, 248) 83.119%)']
let remainingGradients = [...gradients]
export function getRandomGradient(): string | undefined {
  if (remainingGradients.length === 0) {
    remainingGradients = [...gradients]
  }
  const index = Math.floor(Math.random() * remainingGradients.length);
  return remainingGradients.splice(index, 1)[0];
}