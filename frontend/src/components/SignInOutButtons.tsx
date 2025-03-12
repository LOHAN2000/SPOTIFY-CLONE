import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button";

export const SignInOutButtons = () => {

  const {signIn, isLoaded} = useSignIn();

  if (!isLoaded) {
    return null
  }

  const signInWithGoogle = ():void => {
    signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/auth-callback'
    })
  }

  return (
    <Button onClick={signInWithGoogle} variant={'secondary'} className="flex flex-row w-full text-white border-zinc-200 h-11 cursor-pointer text-sm md:text-md"><img src="/google.png" className="w-auto h-6"/> Continue with Google</Button>
  )
}
