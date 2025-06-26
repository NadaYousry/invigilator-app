import { configureStore } from "@reduxjs/toolkit";
import lookupsReducer from "@store/lookupSlice";
import fetchStatusSlice from "@store/fetchStatusSlice";
import assessmentsSlice from "@store/assessments";
import ExamSubmissionSlice from "@store/examSubmissions";
export const store = configureStore({
  reducer: {
    lookups: lookupsReducer,
    fetchStatus: fetchStatusSlice,
    assessments: assessmentsSlice,
    examSubmissions: ExamSubmissionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
