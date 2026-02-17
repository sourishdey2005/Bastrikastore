-- SQL SCHEMA FOR BASTRIKA LUXURY STORE
-- Execute this in the Supabase SQL Editor

-- 1. Enable RLS and Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Linked to Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'seller', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  category TEXT,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT true,
  seller_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL
);

-- RLS POLICIES

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Sellers can manage their own products" ON public.products FOR ALL USING (auth.uid() = seller_id);

-- Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT USING (EXISTS (
  SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
));

-- Sample Data
INSERT INTO public.products (name, description, price, category, stock, image_url) VALUES
('The Empress Sari', 'Hand-woven Mulberry silk with pure zari work.', 2500.00, 'Women', 5, 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?q=80&w=2070&auto=format&fit=crop'),
('Heritage Dhoti Set', 'Fine linen dhoti with a silk embroidered kurta.', 850.00, 'Men', 10, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop'),
('Calcutta Nights Gown', 'Midnight blue velvet gown with artisanal embroidery.', 1800.00, 'Womenswear', 3, 'https://imgs.search.brave.com/doN7kHPDXIJ6d4oBlAeOt5Z23T3cb1tJrCTvHpSQawI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iZWF1/dGlmdWwtc2V4eS13/b21hbi1jbG90aGVz/LWNvbGxlY3Rpb24t/ZHJlc3MtZ2lybC1i/b2R5LXNoYXBlLXlv/dW5nLWJ1c2luZXNz/LXdvbWVuLWhhaXIt/ZXZlbmluZy1tYWtl/dXAtd2VhcmGluZy1z/dWl0LXRvcC1oaWdo/LWhlZWxzLTYwNjg2/NjMwLmpwZw'),
('Royal Bengal Sherwani', 'Gold-threaded ivory sherwani for grand occasions.', 3200.00, 'Weddings', 2, 'https://imgs.search.brave.com/jzxIiDNPPdgNF9v_fizS2ChD-1tSvFABpRY0ulxQgE4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cGFuYXNoaW5kaWEu/Y29tL21lZGlhL2hv/bWUvd2VicC9zaG9w/LWhlYXZ5LWJvcmRl/ci1zYXJlZXMtMzAw/MTI2LndlYnA'),
('Emerald Legacy Choker', '22k gold choker set with uncut emeralds.', 5500.00, 'High Jewellery', 1, 'https://imgs.search.brave.com/2c-RLgTWeQ2Iqftwi91ZfaUz38sYDYp0NGSyc9HQHKg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aHVtYmVydG93bmpl/d2VsbGVycy5jb20v/cHVibGljLzEuMC91/cGxvYWRzL3NvdXJj/ZS9ibG9ncy91bmRl/cnN0YW5kaW5nLWhp/Z2gtamV3ZWxsZXJ5/LzIybW9iaWxlLndl/YnA'),
('Gold Bloom Studs', 'Intricately carved gold studs inspired by nature.', 450.00, 'Fine Jewellery', 20, 'https://imgs.search.brave.com/FOiLkscJKN6DCgK2ZXmlxolvolSG2X7lZcBdKGy_AfE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjMv/NTgxLzI1Ny9zbWFs/bC9iZWF1dGlmdWwt/aW5kaWFuLWFudGlx/dWUtZ29sZGVuLXBh/aXItb2YtZWFycmlu/Z3MtbHV4dXJ5LWZl/bWFsZS1qZXdlbHJ5/LWluZGlhbi10cmFk/aXRpb25hbC1qZXdl/bGxlcnktaW5kaWFu/LWpld2VscnktYnJp/ZGFsLWVhcnJpbmdz/LXdlZGRpbmctamV3/ZWxsZXJ5LWhlYXZ5/LXBhcnR5LWVhcnJp/bmdzLWdlbmVyYXRp/dmUtYWktcGhvdG8u/anBn'),
('Zardozi Silk Clutch', 'Hand-stitched velvet clutch with gold zardozi.', 280.00, 'Accessories', 15, 'https://imgs.search.brave.com/XPC6Db8l7huuOR9Y4XkocadBh3YCpAlGXm4NVxW8klo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzE5OTk5NjYzL2Mv/MTQ4MS8xMTc3LzE1/OC80ODcvaWwvZTcy/ZmMxLzM1NDM0Mjgy/MDkvaWxfMzQweDI3/MC4zNTQzNDI4MjA5/X2x0aXEuanBn'),
('Monsoon Blossom Scarf', 'Lightweight hand-painted silk scarf.', 150.00, 'What\'s New', 25, 'https://imgs.search.brave.com/MjcZdy2kfnmiF2WGhiR-HtVlhnQBxt7-5S1RFNDLGTs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzkzLzIxLzI4/LzM2MF9GXzI5MzIx/MjgxNl9IWVVUQzla/SWtEVE56T05FeUFV/TUR6T3R1QnhQak9I/cS5qcGc');
