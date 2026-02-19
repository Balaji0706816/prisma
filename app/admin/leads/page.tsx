import { prisma } from "../../../lib/db"

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    include: { industry: true, services: { include: { service: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h2 className="text-xl font-semibold">Leads</h2>
      <p className="mt-1 text-sm text-neutral-600">All “Start Your Project” inquiries.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-neutral-50">
            <tr>
              <th className="p-3">Created</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Industry</th>
              <th className="p-3">Services</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b last:border-0">
                <td className="p-3">{new Date(l.createdAt).toLocaleString()}</td>
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.email}</td>
                <td className="p-3">{l.industry?.title ?? "-"}</td>
                <td className="p-3">{l.services.map((x) => x.service.title).join(", ") || "-"}</td>
                <td className="p-3">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
