import { createSlice } from "@reduxjs/toolkit"

const feedSlice = createSlice({
    name: "feed",
    initialState: {

        users: [],
    },
    reducers: {
        addFeed: (state, action) => {
            state.users = action.payload.users || []
        },
        removeFeed: (state, action) => {
            state.users = state.users.filter((user) => user._id.toString() !== action.payload.toString());
            
        }
    }
})

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;