import axios from "axios";
import {type IAnswers} from "@/interfaces/answers.interface";

let gradients = [
  'linear-gradient(128.66deg, rgb(156, 62, 152) 19.063%,rgb(170, 43, 248) 83.119%)', 
  'linear-gradient(128.66deg, rgb(62, 117, 156) 19.063%,rgb(109, 43, 248) 83.119%)',
  'linear-gradient(129deg, #2d8ed5 0%, #7f9afc 38.63%, #7486f9 61.63%, #7946e5 100%, #7946e5 100%)',
  'linear-gradient(129deg, #e07437 0%, #e9a668 38.63%, #5be371 61.63%, #40d446 100%)',
  'linear-gradient(129deg, #2dd5cb 0%, #7fe6fc 38.63%, #9ee4f4 38.64%, #7acfff 61.63%, #4946e5 100%)',
  'linear-gradient(129deg, #d5a62d 0%, #fcd97f 38.63%, #f974d3 63.63%, #e5469c 100%)',
  'linear-gradient(129deg, #632dd5 0%, #af7ffc 38.63%, #ee74f9 61.63%, #e54646 100%)',
  'linear-gradient(129deg, #18b861 0%, #5ae239 38.63%, #aece2f 61.63%, #edba6d 100%)',
  'linear-gradient(129deg, #d52dce 0%, #e562d0 38.63%, #66c2f6 61.63%, #46e5d2 100%)'
]
let remainingGradients = [...gradients]
export function getRandomGradient(): string | undefined {
  if (remainingGradients.length === 0) {
    remainingGradients = [...gradients]
  }
  const index = Math.floor(Math.random() * remainingGradients.length);
  return remainingGradients.splice(index, 1)[0];
}