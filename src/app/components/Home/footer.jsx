import { Divider } from "@nextui-org/divider"
export default function Footer() {
  return (
    <footer className="pt-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <Divider />
        <div className="flex justify-between items-center py-10">
          <p className="font-light">
            KidsAdventure | 
            Made with ❤️
          </p>  
        </div>
      </div>
    </footer>
  )
}
