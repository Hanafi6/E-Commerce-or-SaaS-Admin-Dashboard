import Paragraph from "@/components/ui/Paragraph"
import { ShieldAlert, LaptopMinimalCheck } from 'lucide-react'


function App() {
  return (
    <div className="flex gap-4 flex-wrap lg:flex-nowrap items-center h-screen  justify-center">

      <Paragraph asChild variant="default" size="lg">
        <button onClick={_ => console.log('do SomThing')}>
          Hello World
        </button>
      </Paragraph>

      <Paragraph variant="success" size="lg">

        Hello World
        <LaptopMinimalCheck />
      </Paragraph>
      <Paragraph variant="error" size="lg">
        Hello World
        <ShieldAlert />
      </Paragraph>
    </div>
  )

}

export default App
