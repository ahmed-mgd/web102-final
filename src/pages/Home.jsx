import { useEffect, useState } from 'react';
import { supabase } from '../client';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .order(sortBy, { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    }
    fetchPosts();
  }, [sortBy]);


  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      <h2>Latest Posts</h2>

      {/* Search and Sort Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvotes</option>
        </select>
      </div>

      {/* Post List */}
      {filteredPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}

export default Home;