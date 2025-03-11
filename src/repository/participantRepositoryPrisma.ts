import { PrismaClient } from '@prisma/client';
import type { Participant } from '../models/participant';

const prisma = new PrismaClient();

export function getAllParticipants() {
  return prisma.participant.findMany();
}

export function getParticipantById(id: number) {
  return prisma.participant.findUnique({
    where: { id },
    include: {
      events: true,
    },
  });
}

export async function getAllParticipantPagination(keyword: string, pageSize: number, pageNo: number) {
  const where = {
    OR: [
      { name: { contains: keyword } },
      { email: { contains: keyword } },
    ],
  }

  const participants = await prisma.participant.findMany({
    where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    include: {
      events: true,
    },
  });
  const count = await prisma.participant.count({ where });
  return { count, participants };
}

export function countParticipants() {
  return prisma.participant.count();
}