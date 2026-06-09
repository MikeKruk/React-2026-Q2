import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FormType = 'uncontrolled' | 'react-hook-form';
export interface FormSubmission {
  id: string;
  formType: FormType;
  values: Record<string, string>;
  createdAt: number;
  isNew?: boolean;
}

interface FormsState {
  submissions: FormSubmission[];
}

const initialState: FormsState = {
  submissions: [],
};

const FormsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addSubmission(state, action: PayloadAction<FormSubmission>) {
      state.submissions.unshift({ ...action.payload, isNew: true });
    },

    clearNew(state, action: PayloadAction<string>) {
      const item = state.submissions.find((item) => item.id === action.payload);
      if (item) item.isNew = false;
    },
  },
});

export const { addSubmission, clearNew } = FormsSlice.actions;
export default FormsSlice.reducer;
