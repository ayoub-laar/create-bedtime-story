interface FormCardProps {
  children: React.ReactNode;
}

export function FormCard({ children }: FormCardProps) {
  return (
    <div className="mx-4">
      <div className="w-full bg-white rounded-lg px-6 py-8 mt-[calc(-1*calc(172px-96px))] sm:mt-0">
        {children}
      </div>
    </div>
  )
} 