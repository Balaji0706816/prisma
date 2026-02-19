import { prisma } from "@/lib/db"

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h2 className="text-xl font-semibold">Leads</h2>
      <p className="text-sm text-neutral-600 mt-1">Contact form submissions</p>

      <div className="mt-4 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.email}</td>
                <td className="p-3">{l.phone ?? "-"}</td>
                <td className="p-3 max-w-[500px] truncate">{l.details}</td>
                <td className="p-3">{new Date(l.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && (
          <div className="p-6 text-neutral-500">No leads yet.</div>
        )}
      </div>
    </div>
  )
}
