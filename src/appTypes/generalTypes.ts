import { IAssessmentStore, IExamSubmissionStore } from "@store/types";
import { ReactNode } from "react";

export interface RootState {
  lookups: LookupsState & {
    loading: boolean;
    error: string | null;
  };
  examSubmissions: IExamSubmissionStore;
  assessments: IAssessmentStore;
  //global loader
  fetchStatus: {
    loading: boolean;
    error?: { message: string; status: number | null };
    success?: { message: string; status: number | null };
  };
}

export interface LookupItem {
  id: number;
  label: string;
  value: string;
}

export interface LookupsState {
  assessmentStatus: LookupItem[];
  courses: LookupItem[];
  programs: LookupItem[];
  areas: LookupItem[];
  examStatuses: LookupItem[];
  groups: LookupItem[];
  examAreas: LookupItem[];
  examinees: LookupItem[];
}

export interface SyncData {
  message?: string;
  status?: number | null;
  syncing?: boolean;
  id: number | null;
}

export interface ICommon {
  children?: ReactNode;
  className?: string;
}

export interface IPayloadWithId {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>;
}
