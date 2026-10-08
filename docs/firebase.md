# Firebase (phase 1 — personal use)

The app talks to Firebase directly (Auth + Cloud Firestore) through the Firebase JS SDK; there is no custom backend.

## One-time setup

1. Create a Firebase project and add a **Web app**. Copy its config.
2. **Authentication** → enable **Email/Password**. In **Users**, add your account.
   In **Settings → User actions**, disable sign-up so nobody else can create an account.
3. **Firestore Database** → create the database (Standard edition, id `(default)`, production mode).
4. Deploy the security rules (see below).
5. `cp .env.example .env.local` and fill in the values. `.env.local` is gitignored — never commit it.
6. `npx expo start`. On first launch the app creates your profile with zero balances.

To start over, delete `users/{uid}` and its subcollections (`npx firebase-tools firestore:delete users/<uid> --recursive`),
then restart the app.

## Sign-in

No login screen yet: `src/stores/session-store.ts` restores the persisted session or signs in with
`EXPO_PUBLIC_DEV_EMAIL` / `EXPO_PUBLIC_DEV_PASSWORD`. `EXPO_PUBLIC_*` values are bundled into the app,
so only use builds that stay on your own devices. Opening up to more users means replacing the auto
sign-in with a login screen and re-enabling sign-up — the rules and data layout stay the same.

## Security rules

`firestore.rules` is the source of truth; never edit rules in the console. After changing it:

```bash
npx firebase-tools login   # once per machine
npm run deploy:rules       # deploys to the project in .firebaserc
```

The rules only let a signed-in user reach their own `users/{uid}` tree. They only need to change when
the data layout changes, not when users or default categories are added.

## Data layout

```
users/{uid}                         displayName, currency, balances { cash, bank, ewallet }
users/{uid}/categories/{id}         user-created only: type, name, icon (key), color (palette key), order, archived
users/{uid}/transactions/{id}       type, categoryId, walletId, amount, date "YYYY-MM-DD", note, hasReceipt, createdAt
users/{uid}/monthlyStats/{YYYY-MM}  income, expense, expenseByCategory { [categoryId]: amount }
```

- `date` is a local calendar day string, not a Timestamp, so it never shifts across time zones.
- The 16 default categories (`food`, `salary`, …) live in code (`DEFAULT_CATEGORIES`), not in Firestore,
  and are shared by every user. The app shows them first, then the user's own categories. Their ids are
  stored on transactions, so never rename or remove one. Custom categories must use a Firestore auto id
  (20 chars, enforced by the rules), so they can never collide with a default id.
- `icon`/`color` are keys resolved in code.
- Every add/edit/delete is one write batch that also increments `balances` and `monthlyStats`, so the
  overview never has to load the full history. Code: `src/features/transactions/api/`.
- The app syncs the last 3 months of transactions and the stats for the current year / last 6 months.
  No composite indexes are needed.
