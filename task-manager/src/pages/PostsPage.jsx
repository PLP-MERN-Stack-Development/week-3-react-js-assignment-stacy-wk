import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom'; 

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 

  // Filtering posts
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">API Posts</h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search posts by title or body..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {loading && (
        <p className="text-center text-blue-600 text-xl dark:text-blue-400">Loading posts...</p>
      )}

      {error && (
        <p className="text-center text-red-600 text-xl dark:text-red-400">Error: {error}</p>
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No posts found matching your search.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map(post => (
          <Card key={post.id} className="dark:border dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">{post.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{post.body.substring(0, 100)}...</p>
            <Link to={`/posts/${post.id}`} className="block mt-4 text-blue-600 hover:underline dark:text-blue-500">
              Read More
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {!loading && !error && filteredPosts.length > postsPerPage && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? 'primary' : 'secondary'}
              onClick={() => paginate(i + 1)}
              className="px-4 py-2"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;