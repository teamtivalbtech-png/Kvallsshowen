# Kvällsshowen
Partyspel för tv och telefon. Tv:n öppnar `/tv`, telefonerna skannar QR-koden.
- `npm run dev` startar lokalt, `npm run build` bygger för Vercel.
- Tv:n är spelvärd. Trafik går via Supabase Realtime Broadcast.
- Testläge: `/tv?local=1&fast=10` och `tests/all.mjs`.
