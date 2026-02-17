import { supabase } from '../lib/supabaseClient';

export const getProducts = async (category = null, sortBy = 'price', order = 'asc') => {
    let query = supabase.from('products').select('*');

    if (category) {
        query = query.eq('category', category);
    }

    query = query.order(sortBy, { ascending: order === 'asc' });

    const { data, error } = await query;
    if (error) throw error;
    return data;
};

export const getProductById = async (id) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const getCategories = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('category')
        .neq('category', null);

    if (error) throw error;

    // Return unique categories
    return [...new Set(data.map(item => item.category))];
};
