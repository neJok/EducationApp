import BackButton from "@/components/BackButton";

export default function Page({ params }: { params: { name: string, class: number, id: string } }) {
  return (
    <>
      <BackButton />
      <p>тест {params.name}</p>
    </>
  )
}