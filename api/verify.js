const crypto = require('crypto');
const { db } = require('./_db');
module.exports = async (req, res) => {
  const { razorpay_order_id: oid, razorpay_payment_id: pid, razorpay_signature: sig } = req.body || {};
  if (!oid || !pid || !sig) return res.status(400).json({ error: 'Missing payment details.' });
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(oid + '|' + pid).digest('hex');
  if (expected !== sig) return res.status(400).json({ error: 'Payment could not be verified.' });
  await db.from('orders').update({ status: 'paid', payment_id: pid }).eq('razorpay_order_id', oid);
  const { data, error } = await db.storage.from('ebooks').createSignedUrl(process.env.EBOOK_FILE, 86400);
  if (error) return res.status(500).json({ error: 'Payment done, but link failed. Contact support with payment id ' + pid });
  res.json({ url: data.signedUrl }); // access sirf verification ke baad
};
