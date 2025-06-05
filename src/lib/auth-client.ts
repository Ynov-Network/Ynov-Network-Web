import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient({
  baseURL: import.meta.env.SERVER_URL
})

export const {
  signUp,
  signIn,
  signOut,
} = authClient