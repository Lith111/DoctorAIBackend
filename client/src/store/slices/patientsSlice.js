import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  currentPatient: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    dateRange: null,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  }
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    // طلبات المرضى
    fetchPatientsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.isLoading = false;
      state.patients = action.payload.patients;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    fetchPatientsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // إدارة المريض الحالي
    setCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    },
    clearCurrentPatient: (state) => {
      state.currentPatient = null;
    },
    
    // الفلاتر والبحث
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    // إدارة الأخطاء
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchPatientsStart,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  setCurrentPatient,
  clearCurrentPatient,
  setFilters,
  clearFilters,
  clearError,
} = patientsSlice.actions;

export default patientsSlice.reducer;