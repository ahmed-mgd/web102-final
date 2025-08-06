import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import CommentSection from '../components/CommentSection';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
        setUpvotes(data.upvotes || 0);
      }
    }

    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    const { error } = await supabase
      .from('Posts')
      .update({ upvotes: upvotes + 1 })
      .eq('id', post.id);

    if (error) {
      console.error('Error upvoting:', error);
    } else {
      setUpvotes(prev => prev + 1);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('id', post.id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      window.location = '/';
    }
  };

  if (!post) {
    return <div className="container"><p>Loading post...</p></div>;
  }

  return (
    <main className="container">
      <div className="post-title-row">
        <h2 className="post-title-text">{post.title}</h2>
        <div className="post-controls">
          <button
            className="icon-button"
            aria-label="Edit post"
            onClick={() => window.location = `/edit/${post.id}`}
          >
            <i className="fas fa-pen"></i>
          </button>
          <button
            className="icon-button"
            aria-label="Delete post"
            onClick={handleDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <p className="post-author"><strong>By:</strong> {post.author || 'Anonymous'}</p>
      <p><strong>Created:</strong> {new Date(post.created_at).toLocaleString()}</p>

      {post.content && (
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      )}

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post visual"
          className="post-media"
        />
      )}

      {post.video_url && (
        <>
          {post.video_url.includes('youtube') ? (
            <iframe
              className="post-media"
              src={post.video_url.replace('watch?v=', 'embed/')}
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : (
            <video className="post-media" controls>
              <source src={post.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}

      <div className="upvote-container">
        <button
          className="upvote-button"
          aria-label="Upvote post"
          onClick={handleUpvote}
        >
          <i className="fas fa-arrow-up" aria-hidden="true"></i>
        </button>
        <span className="upvote-count">{upvotes} Upvotes</span>
      </div>
      <CommentSection postId={post.id} />
    </main>
  );
};

export default PostDetail;
