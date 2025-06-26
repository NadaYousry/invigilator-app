import api from "@network/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSuccess } from "@store/fetchStatusSlice";
import { AxiosResponse } from "axios";
import { AssessmentData } from "@pages/download-assessment/DownloadAssessmentTypes";
import { IAssessmentStore } from "@store/types";
import { SyncData } from "@appTypes/generalTypes";

const initialState: IAssessmentStore = {
  list: [],
  assessmentDetails: {} as AssessmentData,
  loading: false,
  syncSubmission: {
    message: "",
    syncing: false,
    status: null,
    id: null,
  },
};

// requests
export const getAssessments = createAsyncThunk<
  AxiosResponse<AssessmentData[]>,
  object | void
>("assessments/getAssessments", async (values, { rejectWithValue }) => {
  try {
    const response = await api.get("/assessments", {
      params: {
        ...values,
      },
    });

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// export const getAssessmentById = createAsyncThunk<
//   AxiosResponse<AssessmentData[]>,
//   number | string
// >("assessments/getAssessmentById", async (id, { rejectWithValue }) => {
//   try {
//     const response = await api.get(`/assessments/${id}`);
//     return response;
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });

export const syncSubmission = createAsyncThunk<AxiosResponse<SyncData>, number>(
  "assessments/sync",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/sync");
      dispatch(setSuccess({ ...response }));
      return { ...response, id: values };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// slice
const AssessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    // setAssessmentDetails: (state, action) => {
    //   state.assessmentDetails = action?.payload;
    // },
  },
  extraReducers: (builder) => {
    // get Assessments
    builder.addCase(getAssessments.fulfilled, (state, action) => {
      state.list = action?.payload as unknown as AssessmentData[];
      state.loading = false;
    });
    builder.addCase(getAssessments.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAssessments.rejected, (state) => {
      state.loading = false;
    });

    // get Assessment By Id
    // builder.addCase(getAssessmentById.fulfilled, (state, action) => {
    //   state.assessmentDetails = action?.payload as unknown as AssessmentData;
    //   state.loading = false;
    // });
    // builder.addCase(getAssessmentById.pending, (state) => {
    //   state.loading = true;
    // });

    // builder.addCase(getAssessmentById.rejected, (state) => {
    //   state.loading = false;
    // });

    // sync submission
    builder.addCase(syncSubmission.fulfilled, (state, action) => {
      state.syncSubmission = action.payload as unknown as SyncData;
      state.syncSubmission.syncing = false;
    });
    builder.addCase(syncSubmission.pending, (state) => {
      state.syncSubmission.syncing = true;
    });
  },
});

export default AssessmentsSlice.reducer;
