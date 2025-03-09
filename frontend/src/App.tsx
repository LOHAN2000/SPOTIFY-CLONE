import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  return (
    <div>
      <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </div>
  )
}

export default App
