# Semestrální práce
## Jak práci spustit?
# Kompilace
Pro kompilaci programu je třeba spustit příkaz:
    npm run make ?
Tento příkaz vypíše možnosti kompilace, včetně možného naplnění daty.
# Spuštění
Nejprve je třeba spustit server MongoDB. Po spuštění MongoDB je nutné zkontrolovat, zdali odpovídají údaje v /src/configuration.ts.
Pokud nikoliv, je zapotřebí tento soubor upravit a program znovu zkompilovat.
Po úspěšném spuštění MongoDB, včetně kontroly nastavení, je program spuštěn příkazem:
  npm run app
případně pro spuštění s výpisem ladících zpráv:
  npm run debug
