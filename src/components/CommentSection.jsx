import { useEffect, useState } from 'react';
import { supabase } from '../client';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  async function fetchComments() {
    const { data, error } = await supabase
      .from('Comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const { error } = await supabase.from('Comments').insert([
      {
        post_id: postId,
        text: text.trim(),
        author: 'Anonymous',
        upvotes: 0
      }
    ]);

    if (error) {
      console.error('Error posting comment:', error);
    } else {
      setText('');
      fetchComments();
    }
  }

  async function handleUpvote(commentId, currentCount) {
    const { error } = await supabase
      .from('Comments')
      .update({ upvotes: currentCount + 1 })
      .eq('id', commentId);

    if (error) {
      console.error('Error upvoting comment:', error);
    } else {
      fetchComments();
    }
  }

  return (
    <section className="comments">
      <h3>Comments</h3>

      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="comment">
            <p><strong>{comment.author || 'Anonymous'}:</strong> {comment.text}</p>

            <button
              className="upvote-box"
              aria-label="Upvote comment"
              onClick={() => handleUpvote(comment.id, comment.upvotes || 0)}
            >
              <i className="fas fa-arrow-up" aria-hidden="true"></i>
              <span>{comment.upvotes || 0}</span>
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          placeholder="Leave a comment..."
          rows="3"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Post Comment</button>
      </form>
    </section>
  );
}

export default CommentSection;