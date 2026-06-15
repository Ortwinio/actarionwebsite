# ActARion Website - Complete Handleiding

Een stap-voor-stap handleiding voor het opzetten, beheren en hosten van de ActARion website. Deze handleiding is geschikt voor beginners.

---

## Inhoudsopgave

1. [Over de Website](#1-over-de-website)
2. [Benodigdheden](#2-benodigdheden)
3. [GitHub Account Aanmaken](#3-github-account-aanmaken)
4. [Lokale Ontwikkelomgeving Opzetten](#4-lokale-ontwikkelomgeving-opzetten)
5. [De Website Lokaal Draaien](#5-de-website-lokaal-draaien)
6. [Vercel Account Aanmaken](#6-vercel-account-aanmaken)
7. [Website Hosten op Vercel](#7-website-hosten-op-vercel)
8. [Eigen Domein Koppelen](#8-eigen-domein-koppelen)
9. [Website Onderhoud](#9-website-onderhoud)
10. [Veelgestelde Vragen](#10-veelgestelde-vragen)

---

## 1. Over de Website

### Wat is de ActARion Website?

De ActARion website is een moderne marketingwebsite gebouwd met de volgende technologieën:

| Component | Technologie |
|-----------|-------------|
| Framework | Next.js 15 (React) |
| Styling | Tailwind CSS |
| Animaties | Framer Motion |
| Blog systeem | Velite (MDX) |
| Hosting | Vercel |

### Website Structuur

```
actarionwebsite/
├── src/                    # Broncode
│   ├── app/[locale]/       # Pagina's (meertalig: en, de, nl)
│   ├── components/         # Herbruikbare componenten
│   └── lib/                # Hulpfuncties
├── content/blogs/          # Blog artikelen (MDX)
├── public/                 # Afbeeldingen en video's
├── docs/                   # Documentatie
└── plans/                  # Projectplannen
```

### Ondersteunde Talen

De website is beschikbaar in 4 talen:
- 🇬🇧 Engels (`/en`)
- 🇩🇪 Duits (`/de`)
- 🇳🇱 Nederlands (`/nl`)
- 🇫🇷 Frans (`/fr`)

---

## 2. Benodigdheden

Voordat je begint, zorg ervoor dat je de volgende software hebt geïnstalleerd:

### Node.js

Node.js is nodig om de website te draaien.

1. Ga naar [nodejs.org](https://nodejs.org/)
2. Download de **LTS versie** (aanbevolen)
3. Volg de installatie-instructies
4. Controleer de installatie:
   ```bash
   node --version    # Moet v18 of hoger zijn
   npm --version     # Wordt meegeleverd met Node.js
   ```

### Git

Git is nodig voor versiebeheer.

**macOS:**
```bash
# Via Homebrew (aanbevolen)
brew install git

# Of via Xcode Command Line Tools
xcode-select --install
```

**Windows:**
- Download van [git-scm.com](https://git-scm.com/download/win)
- Volg de installatie wizard

**Verificatie:**
```bash
git --version
```

### Code Editor (optioneel maar aanbevolen)

Download [Visual Studio Code](https://code.visualstudio.com/) - een gratis code editor met uitstekende ondersteuning voor dit project.

---

## 3. GitHub Account Aanmaken

GitHub is waar de broncode van de website wordt opgeslagen en beheerd.

### Stap 1: Registreren

1. Ga naar [github.com](https://github.com)
2. Klik op **"Sign up"** (rechtsboven)
3. Vul in:
   - **Email**: Je zakelijke e-mailadres
   - **Password**: Een sterk wachtwoord (min. 8 tekens)
   - **Username**: Kies een professionele gebruikersnaam

### Stap 2: Email Verificatie

1. Controleer je inbox voor de verificatie email van GitHub
2. Klik op de verificatielink
3. Voltooi eventuele welkomstvragen

### Stap 3: Git Configureren

Configureer Git met je GitHub gegevens:

```bash
git config --global user.name "Je Naam"
git config --global user.email "je-email@voorbeeld.com"
```

### Stap 4: SSH Key Instellen (aanbevolen)

SSH keys maken veilig verbinden met GitHub makkelijker.

1. **Genereer een nieuwe SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "je-email@voorbeeld.com"
   ```
   Druk op Enter om de standaard locatie te accepteren.

2. **Start de SSH agent:**
   ```bash
   eval "$(ssh-agent -s)"
   ```

3. **Voeg de key toe aan de agent:**
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

4. **Kopieer de public key:**
   ```bash
   # macOS
   pbcopy < ~/.ssh/id_ed25519.pub
   
   # Windows (PowerShell)
   Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
   
   # Linux
   cat ~/.ssh/id_ed25519.pub
   ```

5. **Voeg toe aan GitHub:**
   - Ga naar [GitHub Settings > SSH Keys](https://github.com/settings/keys)
   - Klik op **"New SSH key"**
   - Titel: `Mijn Computer` (of iets herkenbaars)
   - Plak de gekopieerde key
   - Klik op **"Add SSH key"**

6. **Test de verbinding:**
   ```bash
   ssh -T git@github.com
   ```
   Je zou moeten zien: "Hi username! You've successfully authenticated..."

---

## 4. Lokale Ontwikkelomgeving Opzetten

### Repository Clonen

**Via SSH (aanbevolen):**
```bash
git clone git@github.com:Ortwinio/ActARionwebsite.git
cd ActARionwebsite
```

**Via HTTPS:**
```bash
git clone https://github.com/Ortwinio/ActARionwebsite.git
cd ActARionwebsite
```

### Dependencies Installeren

```bash
npm install
```

Dit installeert alle benodigde packages (kan enkele minuten duren bij de eerste keer).

### Environment Variabelen Instellen

1. Maak een `.env.local` bestand aan in de root van het project:
   ```bash
   touch .env.local
   ```

2. Voeg de volgende variabelen toe:
   ```env
   # Loops.so integratie voor nieuwsbrief
   LOOPS_API_KEY=je_loops_api_key
   LOOPS_NEWSLETTERS_LIST_ID=je_lijst_id
   ```

> **Let op:** Vraag de API keys aan bij een beheerder of haal ze uit de Loops dashboard.

---

## 5. De Website Lokaal Draaien

### Development Server Starten

```bash
npm run dev
```

Open je browser en ga naar: [http://localhost:3000](http://localhost:3000)

De website wordt automatisch ververst wanneer je wijzigingen maakt in de code.

### Handige Commando's

| Commando | Beschrijving |
|----------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Bouw productie versie |
| `npm run lint` | Controleer code kwaliteit |
| `npm run lint:fix` | Repareer lint problemen automatisch |
| `npm run check:locales` | Controleer vertalingen |

### Development Server Stoppen

Druk op `Ctrl + C` in de terminal.

---

## 6. Vercel Account Aanmaken

Vercel is het platform waar de website wordt gehost.

### Stap 1: Registreren

1. Ga naar [vercel.com](https://vercel.com)
2. Klik op **"Sign Up"**
3. Kies **"Continue with GitHub"** (aanbevolen)
   - Dit koppelt automatisch je GitHub account
   - Geef Vercel toestemming om je repositories te lezen

### Stap 2: Account Verificatie

1. Bevestig je email indien nodig
2. Kies een team naam (bijv. "ActARion")
3. Selecteer het **Hobby** plan (gratis) of **Pro** plan (betaald)

### Vercel Plannen Vergelijking

| Feature | Hobby (Gratis) | Pro |
|---------|----------------|-----|
| Bandwidth | 100 GB/maand | 1 TB/maand |
| Builds | 6.000 min/maand | 24.000 min/maand |
| Team members | 1 | Onbeperkt |
| Custom domains | ✅ | ✅ |
| SSL | ✅ | ✅ |
| Analytics | Basis | Geavanceerd |

---

## 7. Website Hosten op Vercel

### Methode 1: Via Vercel Dashboard (Aanbevolen voor Beginners)

1. **Login op Vercel:**
   - Ga naar [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Nieuw Project Aanmaken:**
   - Klik op **"Add New..."** → **"Project"**

3. **Repository Importeren:**
   - Kies **"Import Git Repository"**
   - Selecteer `ActARionwebsite` uit de lijst
   - Als je de repository niet ziet, klik op **"Adjust GitHub App Permissions"**

4. **Project Configureren:**
   - **Project Name**: `actarion-website` (of laat standaard)
   - **Framework Preset**: Next.js (wordt automatisch gedetecteerd)
   - **Root Directory**: `./` (standaard)
   - **Build Command**: `npm run build` (standaard)

5. **Environment Variabelen Toevoegen:**
   - Klik op **"Environment Variables"**
   - Voeg toe:
     ```
     LOOPS_API_KEY = [je_api_key]
     LOOPS_NEWSLETTERS_LIST_ID = [je_lijst_id]
     ```

6. **Deploy:**
   - Klik op **"Deploy"**
   - Wacht tot de build voltooid is (2-5 minuten)

7. **Resultaat:**
   - Je krijgt een URL zoals: `actarion-website.vercel.app`
   - De website is nu live!

### Methode 2: Via Vercel CLI (Voor Gevorderden)

1. **Installeer Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # Vanuit de project directory
   vercel
   ```

4. **Productie Deploy:**
   ```bash
   vercel --prod
   ```

### Automatische Deployments

Na de eerste setup:
- Elke **push naar `main`** branch triggert automatisch een nieuwe deployment
- Pull requests krijgen een **preview URL** voor testen

---

## 8. Eigen Domein Koppelen

### Stap 1: Domein Toevoegen in Vercel

1. Ga naar je project in Vercel
2. Klik op **"Settings"** → **"Domains"**
3. Voer je domein in: `www.actarion.com`
4. Klik op **"Add"**

### Stap 2: DNS Configureren

Vercel geeft je de DNS records die je moet instellen. Er zijn twee opties:

**Optie A: CNAME Record (aanbevolen voor www subdomain)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Optie B: A Records (voor root domain)**
```
Type: A
Name: @
Value: 76.76.21.21
```

### Stap 3: DNS Instellen bij je Domain Provider

De exacte stappen verschillen per provider:

**Cloudflare:**
1. Login op [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecteer je domein
3. Ga naar **DNS** → **Records**
4. Klik op **"Add record"**
5. Voer de gegevens in van Stap 2

**GoDaddy / Namecheap / etc:**
1. Login op je account
2. Ga naar **DNS Management** of **Domain Settings**
3. Voeg de records toe zoals aangegeven

### Stap 4: SSL Certificaat

Vercel regelt automatisch een SSL certificaat. Dit kan tot 48 uur duren na DNS configuratie (meestal sneller).

### Stap 5: Verificatie

1. Ga terug naar Vercel → **Settings** → **Domains**
2. Wacht tot de status **"Valid Configuration"** toont
3. Bezoek je domein om te testen

---

## 9. Website Onderhoud

### Wijzigingen Doorvoeren

1. **Maak wijzigingen lokaal:**
   ```bash
   # Start development server
   npm run dev
   
   # Maak je wijzigingen in de code
   ```

2. **Test lokaal:**
   - Controleer de website op [localhost:3000](http://localhost:3000)
   - Test verschillende pagina's en talen

3. **Commit en push:**
   ```bash
   git add .
   git commit -m "Beschrijving van je wijziging"
   git push origin main
   ```

4. **Automatische deployment:**
   - Vercel detecteert de push automatisch
   - Binnen enkele minuten is de nieuwe versie live

### Content Bijwerken

**Blog artikelen:**
- Locatie: `content/blogs/`
- Formaat: MDX (Markdown met React componenten)
- Zie: [Blog Posting Instructions](./content/blog-posting-instructions.md)

**Vertalingen:**
- Locatie: `src/lib/dictionaries/`
- Bestanden: `en.json`, `de.json`, `nl.json`, `fr.json`

### Monitoring

**Vercel Dashboard:**
- Bekijk deployment logs
- Monitor performance
- Check analytics

**Belangrijke metrics:**
- Build tijd
- Function uitvoeringstijd
- Bandwidth gebruik

---

## 10. Veelgestelde Vragen

### Build Fouten

**Probleem:** De build faalt op Vercel

**Oplossing:**
1. Test lokaal:
   ```bash
   npm run build
   ```
2. Fix eventuele fouten
3. Push de fix naar GitHub

### Pagina Niet Gevonden (404)

**Probleem:** Sommige pagina's geven een 404 error

**Oplossing:**
1. Controleer of de pagina bestaat in `src/app/[locale]/`
2. Verifieer de routing in `middleware.ts`
3. Check de Vercel deployment logs

### Vertalingen Missen

**Probleem:** Sommige tekst wordt niet vertaald

**Oplossing:**
```bash
npm run check:locales
```
Dit toont welke vertalingen ontbreken.

### Environment Variabelen Werken Niet

**Probleem:** API functies werken niet

**Oplossing:**
1. Controleer of de variabelen in Vercel zijn ingesteld
2. Verifieer de namen (hoofdlettergevoelig)
3. Redeploy na het toevoegen van variabelen

### Domein Werkt Niet

**Probleem:** Custom domein laadt niet

**Oplossing:**
1. Controleer DNS propagatie: [whatsmydns.net](https://whatsmydns.net)
2. Verifieer de DNS records
3. Wacht 24-48 uur voor volledige propagatie

---

## Hulp Nodig?

- **Technische documentatie:** Zie de `docs/` map
- **Vercel support:** [vercel.com/support](https://vercel.com/support)
- **Next.js documentatie:** [nextjs.org/docs](https://nextjs.org/docs)
- **Contact:** hello@actarion.com

---

*Laatst bijgewerkt: Maart 2026*
*Versie: 1.0.0*
