import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    image_url: '',
    video_url: ''
  });

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
        setForm({
          title: data.title || '',
          content: data.content || '',
          image_url: data.image_url || '',
          video_url: data.video_url || ''
        });
      }
    }

    fetchPost();
  }, [id]);

  // Update post in DB
  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from('Posts')
      .update(form)
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      navigate(`/post/${id}`);
    }
  }

  if (!post) {
    return <div className="container"><p>Loading post...</p></div>;
  }

  return (
    <main className="container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Content"
          rows="5"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />

        <input
          placeholder="Image URL"
          value={form.image_url}
          onChange={e => setForm({ ...form, image_url: e.target.value })}
        />

        <input
          placeholder="Video URL"
          value={form.video_url}
          onChange={e => setForm({ ...form, video_url: e.target.value })}
        />

        <button type="submit">Save Changes</button>
      </form>
    </main>
  );
}

export default EditPost;
