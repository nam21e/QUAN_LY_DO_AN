const supabase = require('../config/supabaseClient');

const TABLE = 'posts';

const Post = {
  table: TABLE,

  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        users:user_id ( id, username, email ),
        categories:category_id ( id, name ),
        locations:location_id ( id, name, address, region_name )
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
        categories:category_id ( id, name ),
        locations:location_id ( id, name, address, region_name )
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async findByRegionName(regionName) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('region_name', regionName)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async findByUserId(userId) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async search(keyword) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%,author_name.ilike.%${keyword}%`)
      .order('created_at', { ascending: false });
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

module.exports = Post;