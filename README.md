Cleak...!

## Log-in

Koden laver en alt-i-én login-, signup- og verifikationsside med Clerk i Next.js, som viser forskellig funktionalitet afhængig af om brugeren er logget ind, og håndterer både oprettelse, login og bekræftelse med en verifikationskode via e-mail.

## api/update-name/route.js:

Denne kode er en API-route i Next.js (server-side) der tillader en logget-in bruger at opdatere sit fornavn og efternavn i Clerk.

## Forgot-password:

Lader en bruger nulstille sin adgangskode i to trin,

1. Brugeren skriver sin e-mail
   handleRequest() sender en anmodning til Clerk om at sende en nulstillingskode via e-mail.

2. Brugeren indtaster kode + ny adgangskode
   handleReset() bruger den kode og den nye adgangskode til at nulstille kontoen og logge brugeren ind automatisk.

---

## React Hook Form

## Zod

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Framer Motion
React Animation Library , lettere at animere forskellige komponneter med forskellige animationer , meget mindre kode hvis man sammenligner med Css og bedre læsebarhed.
run the development server:

```bash
 npm install motion
  # ind i komponent , skal du importere sådan
  import { motion } from "framer-motion";
```

## https://motion.dev/docs/react-transitions#spring (Staggered effekt)....

animate og clippath effekt på forsiden...........

## https://motion.dev/docs/react-quick-start ( whileHover ,whileTap og transition på AnimatedButton komponet, alle primære knapper)............

Brugt perpective, transform og backface visibilty til flipcard sammen med motion div ....
