const { createClient } = require('@supabase/supabase-js');
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
async function currentPrice() {
  const { count } = await db.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'paid');
  const left = Math.max(0, (+process.env.LAUNCH_SLOTS || 100) - (count || 0));
  const regular = +process.env.REGULAR_PRICE || 399;
  return { left, regular, price: left > 0 ? (+process.env.LAUNCH_PRICE || 199) : regular };
}
module.exports = { db, currentPrice };
