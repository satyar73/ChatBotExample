import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  loading: false,
  indexing: false,
  files: [],
  folderId: '',
  error: null,
  success: null,
  stats: {
    totalFiles: 0,
    fileTypes: {}
  }
};

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_INDEXING: 'SET_INDEXING',
  SET_FILES: 'SET_FILES',
  SET_FOLDER_ID: 'SET_FOLDER_ID',
  SET_ERROR: 'SET_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_STATS: 'SET_STATS',
  REMOVE_FILE: 'REMOVE_FILE'
};

// Reducer for state management
const googleDriveReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_INDEXING:
      return { ...state, indexing: action.payload };
    
    case ACTIONS.SET_FILES:
      return { ...state, files: action.payload };
    
    case ACTIONS.SET_FOLDER_ID:
      return { ...state, folderId: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ACTIONS.SET_SUCCESS:
      return { ...state, success: action.payload };
    
    case ACTIONS.SET_STATS:
      return { ...state, stats: action.payload };
    
    case ACTIONS.REMOVE_FILE:
      return { 
        ...state, 
        files: state.files.filter(file => file.id !== action.payload) 
      };
    
    default:
      return state;
  }
};

// Create the context
export const GoogleDriveContext = createContext();

// Provider component
export const GoogleDriveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(googleDriveReducer, initialState);

  return (
    <GoogleDriveContext.Provider value={{ state, dispatch }}>
      {children}
    </GoogleDriveContext.Provider>
  );
};

// Custom hook for using the context
export const useGoogleDriveContext = () => {
  const context = useContext(GoogleDriveContext);
  if (!context) {
    throw new Error('useGoogleDriveContext must be used within a GoogleDriveProvider');
  }
  return context;
};