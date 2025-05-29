import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.redirect(`${request.headers.get("origin") || "/"}/login?error=No authorization code received`)
    }

    // Ανταλλαγή του κωδικού για access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${request.headers.get("origin") || ""}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error("Error exchanging code for token:", tokenData)
      return NextResponse.redirect(
        `${request.headers.get("origin") || "/"}/login?error=Failed to exchange code for token`,
      )
    }

    // Λήψη πληροφοριών χρήστη από το Google
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userInfoResponse.json()

    if (!userInfoResponse.ok) {
      console.error("Error fetching user info:", userData)
      return NextResponse.redirect(`${request.headers.get("origin") || "/"}/login?error=Failed to fetch user info`)
    }

    // Δημιουργία ή ενημέρωση του χρήστη στη βάση δεδομένων σας
    // Εδώ θα προσθέσετε τον κώδικα για να αποθηκεύσετε τον χρήστη στη βάση δεδομένων σας

    // Δημιουργία session ή JWT token
    // Εδώ θα προσθέσετε τον κώδικα για να δημιουργήσετε ένα session ή JWT token

    // Αποθήκευση του token σε cookie
    const response = NextResponse.redirect(`${request.headers.get("origin") || "/"}/dashboard`)

    // Προσθήκη του token σε cookie (παράδειγμα)
    // response.cookies.set('auth_token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return response
  } catch (error) {
    console.error("Error in Google OAuth callback:", error)
    return NextResponse.redirect(`${request.headers.get("origin") || "/"}/login?error=Internal server error`)
  }
}
