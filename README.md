# PV278 - project

Live: https://good-bike-app.vercel.app/

### Průběh kurzu PV278

V rámci tohoto předmětu jsme nejprve dělali UX research, sbírali a zpracovávali požadavky od možných uživatelů naší aplikace. Následně jsme vytvořili [design ve Figmě](https://www.figma.com/file/T0kah9A7ZUtBwMxW75PJ3i/N%C3%A1vrh-UI?node-id=0-1&t=Fjnl5EhcybeIgDAo-0), který jsme prezentovali a po odsouhlasení jsme implementovali samotnou aplikaci. 

### Požadované parametry aplikace
- Použití Reactu
- Landing page
- Implementace autentizace pomocí SSO
- "Dashboard" (úvodní stránka po přihlášení)
- Práce s API
- Tabulka, která zobrazí data z API
- Entity detail
- Graf zobrazující data z API
- Design pouze jako desktop aplikace

### Popis aplikace

Bylo nám poskytnuto API, které poskytovalo data o teplotě a počtu srážek za posledních 60 let. Sami jsme si pak našli API, které poskytuje informace o všech nehodách, které se staly cyklistům v Brně. Abychom udělali myšlenku projektu zajímavější, zadali jsme, že se nacházíme v roce 2013, a tedy že známe budoucnost a víme, jaká přesná teplota bude následující dny, týdny, měsíce, roky. Zároveň víme, jaké nehody se stanou. Na základě těchto informací jsme stanovili podmínky, za kterých je bezpečné vyjet v Brně v daný den na kole a naše aplikace tedy v zásadě doporučovala dopravní prostředek, který by měl uživatel použít. Uživatel má zároveň možnost upravit si parametry, co pro něj znamenají vhodné podmínky pro cestu na kole.

### Project stack

- Nextjs 12
- React 18
- NextAuth
- Tailwindcss
- Typescript
- Tanstack-query, Tanstack-table
- Eslint, Prettier

### Authors
- Dalibor Pantlík
- Petr Wehrenberg

---
TODOs:
- [ ] Responzivita pro mobilní zařízení
- [ ] Výměna MUI component za DaisyUI (nebo jiná knihovna založená na tailwindu)
