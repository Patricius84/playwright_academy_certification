1. E2E Testy

- tady jsem uplne nedodrzel poradi podukolu v zadani ale všechny podukoly jsou pokryte v mem reseni.
- pro zakomponovani post requestu pro vytvoreni uctu a jeho naslednou kontrolu jsem pouzil test.describe.serial aby se jednotlive podtesty spustili po sobe v danem poradi.
- jednotlive podtesty vypadaji takhle a v tomto poradi
  test("register new user and check success message",
  test("create new account via API",
  test("check new account",
  test("fill in user's profile",

2. API Testy

- tady jsem pouzil nacteni prihlasovacich udaju z env souboru.

3. Data Driven Testy

- tady zakladam vždycky pro 1 uzivatele prave 1 ucet.
- strukturu json souboru pro 1 zaznam jsem zvolil takhle
  {
  "firstname": "Peter",
  "surname": "Fiala",
  "accountType": "Current",
  "balance": 0
  }
- pro unikatnost username prikladam nahodne vygenerovane číslo a username pak vypada například takhle "Peter.Fiala45"
- datovy typ number ma omezeni a nedokaze zpracovat číslo vetsi nez 8-mistni, proto jsem tam pridal podminku, která to osetruje, takze pro ty 2 extremni hodnoty se ucet nevytvori a program vrati v konzole oznamovaci hlasku.

4. Atomické testy

- tady jsem skipnul resp zakomentoval jenom kroky pro kontrolu kliknuti na vytvoreni uctu.

5. Vizuální testy

- tady mi není jasne, jak presne kontrolovat hodnoty například jmeno nebo telefon, když muzou byt pokazde jiné.
- pokud se predpoklada, ze kontrola proběhne porad pouze pro tento ucet s těmito hodnotami, pak je to trivialni. (edited)
