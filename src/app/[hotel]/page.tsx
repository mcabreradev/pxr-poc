export default function Page({ params }: { params: { hotel: string } }) {
  return <div>Hotel Page: {params.hotel}</div>;
}
