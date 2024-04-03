import React, { useEffect } from 'react'
import PostCard from './PostCard'
import usePost from '../hooks/usePost'
const PostBlock = ({id}) => {
    const {getPost,loading,error,posts} = usePost();

    useEffect(() => {
        getPost(null,id);
    }, [id]);
  return (
    <div className="posts min-h-[70vh]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-gray-400 text-[10px] xs:text-[14px] mt-2">
          Posts
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {
            loading ? (
              <h1>Loading...</h1>
            ) : (
              posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post._id} img={post.file} title={post.title} caption={post.caption}/>
                ))
              ) : (
                <h1>No Posts</h1>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default PostBlock