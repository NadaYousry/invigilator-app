export interface AssessmentsFormFilters {
  areaId?: number;
  programId?: number;
  courseId?: number;
  statusId?: number;
}

export interface AssessmentData {
  id: number;
  name: string;
  area: string;
  areaId: number;
  program: string;
  programId: number;
  course: string;
  courseId: number;
  startDate: string;
  endDate: string;
  status: string;
  statusId: number;
  mentorsCount: string;
  trackedExamId: string;
}
