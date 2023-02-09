import { createSlice } from '@reduxjs/toolkit';

type Role = 'ADMIN';
export interface UserType {
  name: string;
  image: {
    url: string;
  };
  role: Role | string;
  email: string
}

const initialState: UserType = {
  name: '',
  image: {
    url: '',
  },
  role: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.name = payload.name;
      state.image = payload.imageObj;
      state.role = payload.role;
      state.email = payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
