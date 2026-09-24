# NEXATECH setup (Hinglish steps)

1. **Supabase (free database)**: supabase.com par project banao (region: Mumbai). SQL Editor mein `supabase.sql` run karo.
2. **E-book file**: Storage mein *private* bucket `ebooks` banao, apna PDF upload karo (e.g. `devops-ebook.pdf`). Bonus files ko ek zip/PDF bundle mein daal do.
3. **Keys lo**: Supabase Settings > API se `URL` aur `service_role` key. Razorpay Dashboard > API Keys se Key ID + Secret (pehle **Test mode**).
4. **GitHub**: is folder ko apne repo mein push karo.
5. **Vercel**: Add New > Project > GitHub repo import. Framework: Other. Environment Variables add karo:
   `SUPABASE_URL, SUPABASE_SERVICE_KEY, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, EBOOK_FILE (=devops-ebook.pdf), LAUNCH_PRICE (=199), REGULAR_PRICE (=399), LAUNCH_SLOTS (=100)`. Deploy karo.
6. **Test**: Razorpay test mode ke test card/UPI se payment karo; thank-you page aur Supabase `orders` table check karo.
7. **Live jao**: Razorpay KYC complete hone ke baad Live keys Vercel mein daalo, Redeploy karo. Secret key kabhi GitHub par mat daalna.
8. **Domain**: Vercel > Domains se custom domain jodo (Vercel 24/7 chalta hai).
