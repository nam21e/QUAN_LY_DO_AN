const supabase = require('../config/supabaseClient');

const TABLE = 'bookmarks';

const Bookmark = {
  table: TABLE,

  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        users:user_id ( id, username, email ),
        posts:post_id ( id, title, image_url )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async findByUserId(userId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        posts:post_id ( id, title, image_url, author_name, region_name, created_at )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async findOne(userId, postId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .maybeSingle();
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

  async deleteByUserAndPost(userId, postId) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);
    if (error) throw error;
    return true;
  }
};

module.exports = Bookmark;