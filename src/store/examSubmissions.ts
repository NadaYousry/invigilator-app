import api from "@network/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AssessmentData } from "@pages/download-assessment/DownloadAssessmentTypes";
import { IExamSubmissionStore } from "@store/types";
import { IPayloadWithId } from "@appTypes/generalTypes";
import { setSuccess } from "./fetchStatusSlice";

const initialState: IExamSubmissionStore = {
  list: [],
  loading: false,
};

// requests

export const getExamSubmissions = createAsyncThunk<
  AxiosResponse<AssessmentData[]>,
  object | void
>("examSubmission/examSubmissions", async (values, { rejectWithValue }) => {
  try {
    const response = await api.get(`/examSubmissions`, {
      params: {
        ...values,
      },
    });
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editExamSubmissions = createAsyncThunk<
  AssessmentData[], // 👈 not AxiosResponse
  IPayloadWithId
>(
  "examSubmission/edit",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async ({ id, payload }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/examSubmissions/${id}`, {
        ...payload,
      });
      dispatch(setSuccess({ ...response }));

      return response; // make sure `response` is actually the data array
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// slice
const ExamSubmissionSlice = createSlice({
  name: "examSubmission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get Assessments
    builder.addCase(getExamSubmissions.fulfilled, (state, action) => {
      state.list = action?.payload as unknown as AssessmentData[];
      state.loading = false;
    });
    builder.addCase(getExamSubmissions.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getExamSubmissions.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default ExamSubmissionSlice.reducer;
