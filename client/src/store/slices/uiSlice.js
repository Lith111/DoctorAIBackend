import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  currentPage: 'dashboard',
  theme: 'light',
  notifications: [],
  modals: {
    patientForm: false,
    imageUpload: false,
    aiAnalysis: false,
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addNotification: (state, action) => {
      const notification = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
  },
});

export const {
  toggleSidebar,
  setCurrentPage,
  toggleTheme,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;