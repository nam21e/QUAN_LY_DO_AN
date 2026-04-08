const supabase = require('../config/supabaseClient');

const TABLE = 'comments';

const Comment = {
  table: TABLE,

  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        users:user_id ( id, username, email ),
        posts:post_id ( id, title )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        users:user_id ( id, username, email ),
        posts:post_id ( id, title )
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async findByPostId(postId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        users:user_id ( id, username, email )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};

module.exports = Comment;