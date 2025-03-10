import type { Participant } from "../models/participant";
import * as repo from "../repository/participantRepositoryPrisma";

export function getAllParticipants() {
  return repo.getAllParticipants();
}

export function getParticipantById(id: number) {
  return repo.getParticipantById(id);
}

export async function getAllParticipantPagination(keyword: string,pageSize: number, pageNo: number) {
  const pageParticipants = await repo.getAllParticipantPagination(keyword,pageSize, pageNo);
  return pageParticipants;
}

export function countParticipants() {
  return repo.countParticipants();
}