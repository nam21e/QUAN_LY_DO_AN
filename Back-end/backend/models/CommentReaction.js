  const supabase = require('../config/supabaseClient');

const TABLE = 'comment_reactions';

const CommentReaction = {
  table: TABLE,

  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async findByCommentId(commentId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('comment_id', commentId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async findOne(userId, commentId, type = 'like') {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('user_id', userId)
      .eq('comment_id', commentId)
      .eq('type', type)
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

  async delete(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  async deleteByUserAndComment(userId, commentId, type = 'like') {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('user_id', userId)
      .eq('comment_id', commentId)
      .eq('type', type);
    if (error) throw error;
    return true;
  }
};

module.exports = CommentReaction;