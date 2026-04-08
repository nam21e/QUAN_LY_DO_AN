const supabase = require('../config/supabaseClient');

const TABLE = 'post_tags';

const PostTag = {
  table: TABLE,

  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        posts:post_id ( id, title ),
        tags:tag_id ( id, name )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async findByPostId(postId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        tags:tag_id ( id, name )
      `)
      .eq('post_id', postId);
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

  async deleteByPostAndTag(postId, tagId) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('post_id', postId)
      .eq('tag_id', tagId);
    if (error) throw error;
    return true;
  }
};

module.exports = PostTag;