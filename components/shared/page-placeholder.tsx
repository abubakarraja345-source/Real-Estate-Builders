interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </main>
  );
}
