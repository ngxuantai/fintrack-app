# Firebase (phase 1 — personal use)

The app talks to Firebase directly (Auth + Cloud Firestore) through the Firebase JS SDK; there is no custom backend.

## One-time setup

1. Create a Firebase project and add a **Web app**. Copy its config.
2. **Authentication** → enable **Email/Password**. In **Users**, add your account and copy its UID.
   In **Settings → User actions**, disable sign-up so nobody else can create an account.
3. **Firestore Database** → create the database. In **Rules**, paste `firestore.rules` after replacing
   `REPLACE_WITH_YOUR_UID` with your UID.
4. `cp .env.example .env.local` and fill in the values. `.env.local` is gitignored — never commit it.
5. `npx expo start`. On first launch the app creates your profile, the default categories and, if
   `EXPO_PUBLIC_SEED_MOCK_DATA=true`, the demo transactions.

To reseed, delete `users/{uid}` and its subcollections in the console, then restart the app.

## Sign-in

No login screen yet: `src/stores/session-store.ts` restores the persisted session or signs in with
`EXPO_PUBLIC_DEV_EMAIL` / `EXPO_PUBLIC_DEV_PASSWORD`. `EXPO_PUBLIC_*` values are bundled into the app,
so only use builds that stay on your own devices. Opening up to more users means replacing the auto
sign-in with a login screen and removing the UID check from the rules — the data layout stays the same.

## Data layout

```
users/{uid}                         displayName, currency, balances { cash, bank, ewallet }
users/{uid}/categories/{id}         type, name, icon (key), color (palette key), order, isDefault, archived
users/{uid}/transactions/{id}       type, categoryId, walletId, amount, date "YYYY-MM-DD", note, hasReceipt, createdAt
users/{uid}/monthlyStats/{YYYY-MM}  income, expense, expenseByCategory { [categoryId]: amount }
```

- `date` is a local calendar day string, not a Timestamp, so it never shifts across time zones.
- Default categories keep their ids (`food`, `salary`, …); `icon`/`color` are keys resolved in code.
- Every add/edit/delete is one write batch that also increments `balances` and `monthlyStats`, so the
  overview never has to load the full history. Code: `src/features/transactions/api/`.
- The app syncs the last 3 months of transactions and the stats for the current year / last 6 months.
  No composite indexes are needed.
