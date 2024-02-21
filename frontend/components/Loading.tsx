export default function Loading({width, height}: {width: number, height: number}) {
  return (
    <div
      style={{
        width: width,
        height: height - (height * 0.3),
        borderRadius: 10,
        backgroundColor: "#7E7E7E",
      }}
    />
  )
}