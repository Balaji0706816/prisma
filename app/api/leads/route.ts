export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "../../../lib/db"

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  details: z.string().min(10),
  industryId: z.string().optional(),
  serviceIds: z.array(z.string()).default([]),

  // honeypot anti-spam (keep hidden in UI)
  website: z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const data = LeadSchema.parse(body)

  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true }) // bot trap
  }

  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone ?? null,
      details: data.details,
      industryId: data.industryId ?? null,
      services: { create: data.serviceIds.map((serviceId) => ({ serviceId })) },
    },
  })

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 })
}
