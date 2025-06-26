import api from "@network/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LookupItem, LookupsState } from "@appTypes/generalTypes";
import { AxiosResponse } from "axios";

const initialState: LookupsState = {
  assessmentStatus: [],
  courses: [],
  programs: [],
  areas: [],
  examAreas: [],
  examinees: [],
  examStatuses: [],
  groups: [],
};

// requests
export const getAssessmentsStatus = createAsyncThunk<
  AxiosResponse<LookupItem[]>
>("lookups/status", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/status");
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getAreas = createAsyncThunk<AxiosResponse<LookupItem[]>>(
  "lookups/areas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/areas");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPrograms = createAsyncThunk<AxiosResponse<LookupItem[]>>(
  "lookups/programs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/programs");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCourses = createAsyncThunk<AxiosResponse<LookupItem[]>, number>(
  "lookups/courses",
  async (programId, { rejectWithValue }) => {
    try {
      const response = await api.get("/courses", {
        params: { programId },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getGroups = createAsyncThunk<AxiosResponse<LookupItem[]>>(
  "lookups/groups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/groups");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getExamAreas = createAsyncThunk<AxiosResponse<LookupItem[]>>(
  "lookups/examAreas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/examAreas");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getExaminees = createAsyncThunk<AxiosResponse<LookupItem[]>>(
  "lookups/examinees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/examinees");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getExamSessionStatuses = createAsyncThunk<
  AxiosResponse<LookupItem[]>
>("lookups/examSessionStatuses", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/examSessionStatuses");
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// slice
const lookupsSlice = createSlice({
  name: "lookups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // assessments lookups
    builder.addCase(getAssessmentsStatus.fulfilled, (state, action) => {
      state.assessmentStatus = action.payload as unknown as LookupItem[];
    });
    builder.addCase(getAreas.fulfilled, (state, action) => {
      state.areas = action.payload as unknown as LookupItem[];
    });
    builder.addCase(getPrograms.fulfilled, (state, action) => {
      state.programs = action.payload as unknown as LookupItem[];
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.courses = action.payload as unknown as LookupItem[];
    });

    //exam lookups
    builder.addCase(getExamSessionStatuses.fulfilled, (state, action) => {
      state.examStatuses = action.payload as unknown as LookupItem[];
    });
    builder.addCase(getExamAreas.fulfilled, (state, action) => {
      state.examAreas = action.payload as unknown as LookupItem[];
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups = action.payload as unknown as LookupItem[];
    });
    builder.addCase(getExaminees.fulfilled, (state, action) => {
      state.examinees = action.payload as unknown as LookupItem[];
    });
  },
});

export default lookupsSlice.reducer;
