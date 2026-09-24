const Razorpay = require('razorpay');
const { db, currentPrice } = require('./_db');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email } = req.body || {};
  if (!name || !/^\S+@\S+\.\S+$/.test(email || '')) return res.status(400).json({ error: 'Please enter your name and a valid email.' });
  const { price } = await currentPrice(); // price server par decide hota hai, user badal nahi sakta
  const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
  const order = await rz.orders.create({ amount: price * 100, currency: 'INR', receipt: 'ebook_' + Date.now() });
  await db.from('orders').insert({ razorpay_order_id: order.id, name, email, amount: price, status: 'created' });
  res.json({ order_id: order.id, amount: order.amount, key: process.env.RAZORPAY_KEY_ID });
};
