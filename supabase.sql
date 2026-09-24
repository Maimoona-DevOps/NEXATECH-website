create table orders(
  id bigint generated always as identity primary key,
  razorpay_order_id text unique, payment_id text,
  name text, email text, amount int,
  status text default 'created', created_at timestamptz default now());
alter table orders enable row level security;
