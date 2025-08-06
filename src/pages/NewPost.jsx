import { useState } from 'react';
import { supabase } from '../client';

const NewPost = () => {
  const [form, setForm] = useState({ title: '', content: '', image_url: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('Posts').insert([form]);
    window.location = "/";
  };

  return (
    <main className="container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          required
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
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
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default NewPost;
