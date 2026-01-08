-- =====================================================
-- Luxury Fashion Platform - Seed Data
-- =====================================================

-- Admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, full_name, role) VALUES
('admin@luxury.com', '$2b$10$rQEY4Xr7wGjJzL5X3G4Yh.J1X3G4Yh.J1X3G4Yh.J1X3G4Yh', 'Super Admin', 'super_admin');

-- Sample Products
INSERT INTO products (name, description, category, subcategory, price, original_price, images, sizes, colors, stock, featured, brand, material) VALUES
-- Clothing
('Cashmere Wool Coat', 'Luxurious cashmere blend overcoat with timeless silhouette. Handcrafted in Italy.', 'clothing', 'coats', 12500000, 15000000, '["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800"]', '["S", "M", "L", "XL"]', '["Charcoal", "Camel", "Navy"]', 50, true, 'Loro Piana', 'Cashmere Blend'),

('Silk Blouse', 'Elegant silk blouse with mother-of-pearl buttons. Perfect for any occasion.', 'clothing', 'tops', 4500000, null, '["https://images.unsplash.com/photo-1604006852748-903fdef54c68?w=800"]', '["XS", "S", "M", "L"]', '["Ivory", "Blush", "Black"]', 100, true, 'The Row', '100% Mulberry Silk'),

('Tailored Wool Trousers', 'Classic tailored trousers in fine Italian wool. Timeless elegance meets comfort.', 'clothing', 'bottoms', 5800000, null, '["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"]', '["28", "30", "32", "34", "36"]', '["Black", "Navy", "Charcoal"]', 80, true, 'Brunello Cucinelli', 'Italian Wool'),

('Merino Knit Sweater', 'Ultra-soft merino wool sweater with ribbed details. Understated luxury.', 'clothing', 'sweaters', 3200000, 4000000, '["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800"]', '["S", "M", "L", "XL"]', '["Oatmeal", "Grey", "Forest Green"]', 120, false, 'Johnstons of Elgin', 'Fine Merino Wool'),

-- Accessories
('Leather Tote Bag', 'Structured leather tote with suede lining. Handcrafted by master artisans.', 'accessories', 'bags', 8500000, null, '["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"]', '[]', '["Black", "Cognac", "Taupe"]', 30, true, 'Bottega Veneta', 'Full-grain Leather'),

('Silk Scarf', 'Hand-printed silk scarf with exclusive pattern. Made in France.', 'accessories', 'scarves', 2800000, null, '["https://images.unsplash.com/photo-1584917865422-8cd4a5b8d2d0?w=800"]', '[]', '["Blue/Gold", "Red/Black", "Green/Ivory"]', 60, false, 'Hermès', '100% Silk Twill'),

('Leather Belt', 'Minimalist leather belt with brushed gold buckle. Understated elegance.', 'accessories', 'belts', 1800000, null, '["https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800"]', '["80", "85", "90", "95", "100"]', '["Black", "Brown"]', 90, false, 'Loro Piana', 'Italian Calf Leather'),

('Cashmere Gloves', 'Soft cashmere-lined leather gloves. Perfect winter essential.', 'accessories', 'gloves', 1500000, 1800000, '["https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800"]', '["S", "M", "L"]', '["Black", "Cognac"]', 45, false, 'Dents', 'Leather with Cashmere Lining');

-- Discount codes
INSERT INTO discounts (code, discount_type, discount_value, min_purchase, max_discount, max_uses, valid_from, valid_until, active) VALUES
('WELCOME10', 'percentage', 10, 1000000, 500000, 1000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 year', true),
('LUXURY20', 'percentage', 20, 5000000, 2000000, 500, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '6 months', true),
('FLAT500K', 'fixed', 500000, 3000000, null, 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '3 months', true);
