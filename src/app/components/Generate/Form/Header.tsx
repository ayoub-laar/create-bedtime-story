interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2 sm:gap-3">
      <div className="text-2xl font-bold">{title}</div>
      <p className="text-grey font-normal text-base ">{description}</p>
    </header>
  );
}
