import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";

const initialState={
   posts:[],
   error:null,
   loading:false,
};

export const createPost=createAsyncThunk(
    "posts/createPost",
    async(newPost,{rejectWithValue})=>{
        try {
            let res= await apiInstance.post("/.json",newPost)
            console.log(res);
            return { ...newPost, id: res.data.name };
            
        } catch (error) {
            return rejectWithValue(error.message);
            
        }
    }

)
export const fetchPost=createAsyncThunk(
  "posts/fetchPost",
 async(_,{rejectWithValue})=>{
  try {
    let res=await apiInstance.get("/.json");
    console.log(res);
    return Object.keys(res.data).map((key)=>({
      id:key,
      ...res.data[key],
    }));  
  } catch (error) {
    return rejectWithValue(error.message);
    
  }
 }
)

export const deletePost=createAsyncThunk(
  "posts/deletePost",
  async(id,{rejectWithValue})=>{
    try {
      await apiInstance.delete(`/${id}.json`);
      return id; 
    } catch (error) {
      return rejectWithValue(error.message)
      
    }
  }
)

export const editPost=createAsyncThunk(
  "posts/editPost",
  async(post,{rejectWithValue})=>{
    try {
      let obj={
        title:post.title,
        discription:post.discription
      };
      await apiInstance.put(`/${post.id}.json`,obj)
      return post;
    } catch (error) {
      return rejectWithValue(error.message)
    }

  }
)

const PostSlice=createSlice({
    name:"Posts",
    initialState,
    reducers: {},
    extraReducers:(buildre)=>{
        buildre
        .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPost.pending,(state,action)=>{
        state.loading=true;
      
      })
      .addCase(fetchPost.fulfilled,(state,action)=>{
        state.loading=false;
        state.posts=action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled,(state,action)=>{
        state.posts = state.posts.filter(post => post.id !== action.payload);

      })
      .addCase(editPost.fulfilled,(state,action)=>{
        state.posts=state.posts.filter((post)=>{
          let{id,title,discription}=action.payload;
          if(post.id==id){
            post.title=title,
            post.discription=discription
          }
          return post;

        });
      });
    },
});

export default PostSlice.reducer