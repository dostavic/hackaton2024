import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex items-center px-16 w-full h-[100px]">
      <div className="flex items-center flex-1">
        <h1 className="text-2xl font-medium text-white">Testify</h1>
      </div>
      <div className="flex justify-end flex-1">
        <Button variant="secondary" className="rounded-xl">
          About us
        </Button>
      </div>
    </header>
  )
}

