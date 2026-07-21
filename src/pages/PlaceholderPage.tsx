export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-12 text-center">
      <h1>{title}</h1>
      <p className="text-muted-foreground">Страница в разработке.</p>
    </div>
  )
}
