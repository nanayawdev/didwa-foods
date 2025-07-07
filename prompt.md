Build a modern, responsive web app for **Didwa Foods** — a fresh produce delivery company in Ghana. The app has 2 shopping flows:

Use khebab-case for the file names please.
---

🌿 FEATURE 1: BROWSE PRODUCTS + CART + CHECKOUT

✅ **User Flow:**

- Homepage shows categories (Vegetables, Fruits, Meat, Fish, Spices, etc.)

- Users browse products and add to cart

- Cart shows total + ability to remove items

- Checkout form includes:

  - Full Name, Phone, Delivery Address, Optional Notes

  - Option to choose “Delivery” or “Pickup”

- Payment handled via **Paystack**

✅ **Supabase Tables**

Table: `products`

- id, name, category, price_per_unit, image_url, description, stock, is_active

Table: `orders`

- id, user_id (nullable), name, phone, address, delivery_type ('home' | 'pickup'), cart_items (JSON), total_amount, payment_status, delivery_code, delivery_status, created_at

✅ **Functionality**

- Use Supabase for Auth for both admin and users product storage, and order storage

- Upload product images via Supabase Storage

- Generate a 6-digit `delivery_code` after payment success

- Send code to customer via SMS

---

📝 FEATURE 2: CUSTOM SHOPPING LIST (FOR ITEMS NOT ON WEBSITE)

✅ **Form Fields:**

- Full Name

- Phone Number

- Delivery Area

- Shopping List (textarea)

- Upload Image (optional, max 5MB)

✅ **Supabase Table: `shopping_requests`**

- id, name, phone, delivery_area, list_text, image_url, amount, payment_status, delivery_code, delivery_status, delivery_type, created_at

✅ **Admin Flow**

- Admin views requests, sets price, sends approval

- User gets payment prompt

- After Paystack payment → generate `delivery_code` and store

---

🚚 FEATURE 3: DELIVERY CODE CONFIRMATION

✅ **For Agents or Pickup Staff**

- Page: `/confirm-delivery`

- Input: Phone Number or Order ID + Delivery Code

- If correct:

  - Mark order/shopping_request as `delivered`

  - Show success message

- If invalid:

  - Show error

---

---Scafold folder structure as well

Your job is to scaffold all pages, create UI components, connect Supabase database and storage, integrate Paystack, and ensure secure and responsive user experience across devices. Focus on modularity, performance, and reusability. Add comments to guide future developers.