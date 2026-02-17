import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download, MapPin, Package, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      alert('Order status updated!');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status.');
    }
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Order Management</h1>
          <p className="page-subtitle">Manage customer orders from Supabase.</p>
        </div>
        <button className="btn-outline flex items-center gap-2" onClick={fetchOrders}>
          Refresh List
        </button>
      </div>

      <div className="card filter-card">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search orders..." />
        </div>
        <div className="filters">
          <select className="category-select">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      <div className="layout-content">
        <div className={`card table-card ${selectedOrder ? 'with-details' : ''}`}>
          {loading ? (
            <div className="loading">Loading orders...</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={selectedOrder?.id === order.id ? 'selected' : ''}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="font-medium">#{order.id.slice(0, 8)}</td>
                    <td>
                      <div className="customer-info">
                        <span className="name">{order.profiles?.full_name || 'Anonymous'}</span>
                        <span className="email">{order.profiles?.email || 'No email'}</span>
                      </div>
                    </td>
                    <td className="title-gold">₹{parseFloat(order.total_amount).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="icon-btn-sm" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}>
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selectedOrder && (
          <div className="order-details-panel card">
            <div className="panel-header">
              <h3>Order Details</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>&times;</button>
            </div>

            <div className="detail-section">
              <div className="order-status-update">
                <label>Update Status</label>
                <select
                  value={selectedOrder.status.toLowerCase()}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="detail-section">
              <h4 className="section-title"><MapPin size={16} /> Shipping Address</h4>
              <div className="address-text">
                {(() => {
                  if (!selectedOrder.shipping_address) return 'No address provided';
                  try {
                    const addr = JSON.parse(selectedOrder.shipping_address);
                    return (
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">{addr.fullName}</p>
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                        <p className="text-sm text-gray-500">{addr.phone}</p>
                      </div>
                    );
                  } catch (e) {
                    return selectedOrder.shipping_address;
                  }
                })()}
              </div>
            </div>

            <div className="panel-footer">
              <button className="btn-primary full-width" onClick={() => setSelectedOrder(null)}>Done</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .orders-page { display: flex; flex-direction: column; gap: 24px; }
        .page-header { display: flex; justify-content: space-between; align-items: center; }
        .filter-card { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; }
        .search-bar { display: flex; align-items: center; gap: 12px; background: var(--bg); padding: 8px 16px; border-radius: 8px; width: 300px; }
        .search-bar input { background: none; border: none; outline: none; width: 100%; }
        
        .layout-content { display: flex; gap: 24px; align-items: flex-start; }
        .table-card { flex: 1; overflow-x: auto; }
        .table-card.with-details { flex: 0.65; }
        .order-details-panel { flex: 0.35; position: sticky; top: 100px; padding: 24px; }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table tr { cursor: pointer; }
        .data-table tr.selected { background: #fefcf0; }
        .data-table th { text-align: left; padding: 12px 16px; color: var(--text-light); border-bottom: 1px solid var(--border); }
        .data-table td { padding: 16px; border-bottom: 1px solid var(--border); }

        .customer-info { display: flex; flex-direction: column; }
        .customer-info .name { font-weight: 600; }
        .customer-info .email { font-size: 0.75rem; color: var(--text-light); }

        .badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .badge.delivered { background: #ecfdf5; color: #10b981; }
        .badge.processing { background: #eff6ff; color: #3b82f6; }
        .badge.pending { background: #fefce8; color: #ca8a04; }
        .badge.shipped { background: #f5f3ff; color: #7c3aed; }
        .badge.cancelled { background: #fee2e2; color: #dc2626; }

        .order-status-update select { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border); }
        .address-text { font-size: 0.85rem; color: var(--text-light); line-height: 1.6; }
        .loading { padding: 40px; text-align: center; color: var(--text-light); }
        .full-width { width: 100%; }
      `}</style>
    </div>
  );
};

export default Orders;



