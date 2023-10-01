interface Props {
  params: { customer: string };
}

export default function EntryDetail({ params: { customer } }: Props) {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="">Hello {customer}!</div>
    </main>
  );
}
