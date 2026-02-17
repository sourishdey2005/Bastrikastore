import { supabase } from '../lib/supabaseClient';

export const createOrder = async (orderData) => {
    try {
        // 1. Create the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([
                {
                    user_id: orderData.userId,
                    total_amount: orderData.total,
                    shipping_address: JSON.stringify(orderData.address), // Store address as JSON string
                    status: 'pending',
                    created_at: new Date()
                }
            ])
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create order items
        const orderItems = orderData.items.map(item => ({
            order_id: order.id,
            product_id: item.productId,
            quantity: item.quantity,
            unit_price: item.price
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getMyOrders = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                products (name, image_url)
            )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};
