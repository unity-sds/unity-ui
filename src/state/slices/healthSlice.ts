import axios, { AxiosRequestConfig } from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Config from "../../Config";

enum HEALTH_ACTIONS {
  GET_HEALTH = "health/getHealth",
}

type HealthCheck = {
  status:string;
  date:string | number;
}

export type Service = {
  componentName:string;
  landingPageUrl:string;
  healthChecks: Array<HealthCheck>
};

export type HealthState = {
  error: string | null | undefined
  items: Service[]
  lastUpdated: number | undefined,
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
};

const initialState:HealthState = {
  error: null,
  items: [],
  lastUpdated: undefined,
  status: 'idle',
};

/**
 * Get all the instruments from the PDS OpenSearch API
 */ 
export const getHealthData = createAsyncThunk(
  HEALTH_ACTIONS.GET_HEALTH,
  async (_:void, thunkAPI) => {
    
    const url = Config['cs']['health_endpoint'];
    
    const config:AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    try {
      const response = await axios.get(url, config);
      return response.data.services;
    } catch (err:any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
    
  }
);

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getHealthData.pending, (state, _action) => {
      // When data is being fetched
      state.status = "pending";
    });
    
    builder.addCase(getHealthData.fulfilled, (state, action) => {
      // When data is fetched successfully
      state.status = "succeeded";
      state.lastUpdated = Date.now();

      // Parse and store the fetched data into the state
      const data = action.payload;
      state.items = data;

    });
    
    builder.addCase(getHealthData.rejected, (state, action) => {
      // When data is fetched unsuccessfully
      state.status = "failed";
      
      // Update the error message for proper error handling
      state.error = action.error.message;
    });
    
  }
});

export default healthSlice.reducer;