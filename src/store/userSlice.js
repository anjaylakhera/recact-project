import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const dummyUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Moderator',
    status: 'Inactive',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'Active',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'User',
    status: 'Pending',
    avatar: 'https://mui.com/static/images/avatar/5.jpg',
  },
];

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
   const response = await fetch('https://jsonplaceholder.typicode.com/users?_page=1&_limit=10');
   let dummyUsers = await response.json();
  
   await new Promise((resolve) => setTimeout(resolve, 1000));
   return dummyUsers;
});

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser, clearCurrentUser, addUser } = userSlice.actions;
export default userSlice.reducer;
