import React, { useState } from 'react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'Just completed the Constitution basics module! Great learning experience!',
      likes: 5,
      comments: 2,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Anyone want to join my study group for the Fundamental Rights chapter?',
      likes: 3,
      comments: 1,
      timestamp: '4 hours ago'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: 'Current User', // TODO: Replace with actual user data
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Community</h1>
      
      {/* Create Post */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <form onSubmit={handlePostSubmit}>
          <textarea
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
            rows="3"
            placeholder="Share your thoughts..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="ml-3">
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            <div className="flex items-center text-gray-500 space-x-4">
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <span>👍</span>
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <span>💬</span>
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community; 