import { auth } from "../../auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) redirect("/api/auth/signin")
  if ((session.user as any).role !== "ADMIN") redirect("/")

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">WebAIGen Admin</h1>
          <a className="text-sm underline" href="/">Back to site</a>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">{children}</div>
      </div>
    </div>
  )
}
