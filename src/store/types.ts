import { AssessmentData } from "@pages/download-assessment/DownloadAssessmentTypes";
import { SyncData } from "@appTypes/generalTypes";

export interface IAssessmentStore {
  list: AssessmentData[];
  assessmentDetails: AssessmentData;
  loading: boolean;
  syncSubmission: SyncData;
}

export interface IExamSubmissionStore {
  list: AssessmentData[];
  loading: boolean;
}
