import Image from "next/image";

export default function Happy() {
  return (
    <Image
      src='/cat_meme.gif'
      alt='cat_meme'
      width={250}
      height={250}
    />
  )
}