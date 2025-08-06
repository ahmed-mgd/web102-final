import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

export default function PostCard({ post }) {
  const [count, setCount] = useState(post.upvotes || 0);

  async function handleUpvote() {
    const { error } = await supabase
      .from('Posts')
      .update({ upvotes: count + 1 })
      .eq('id', post.id);

    if (error) {
      console.error('Error upvoting:', error);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-title-group">
          <Link to={`/post/${post.id}`} className="post-title">
            {post.title}
          </Link>
          <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
        </div>

        <button
          className="upvote-box"
          aria-label="Upvote post"
          onClick={handleUpvote}
        >
          <i className="fas fa-arrow-up" aria-hidden="true"></i>
          <span>{count}</span>
        </button>
      </div>
    </div>
  );
}
