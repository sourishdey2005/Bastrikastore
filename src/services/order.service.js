import { supabase } from '../lib/supabaseClient';

export const createOrder = async (orderData) => {
    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                user_id: orderData.userId,
                items: orderData.items,
                total: orderData.total,
                shipping_address: orderData.address,
                status: 'pending',
                created_at: new Date()
            }
        ])
        .select();

    if (error) throw error;
    return data[0];
};

export const getMyOrders = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};
