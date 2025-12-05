# 🚀 Professional Development Environment Setup

A comprehensive setup script that installs and configures a modern development environment on macOS.

## What's Included

### Version Managers
- **NVM** - Node Version Manager (with lazy loading for fast shell startup)
- **pyenv** - Python Version Manager  
- **rbenv** - Ruby Version Manager

### CLI Tools
| Category | Tools |
|----------|-------|
| **Version Control** | git, gh (GitHub CLI), git-lfs, lazygit |
| **Shell** | zsh, starship prompt, fzf, tmux |
| **Modern Unix** | eza (ls), bat (cat), ripgrep (grep), fd (find) |
| **Utilities** | jq, yq, htop, tldr, tree, httpie |
| **Databases** | PostgreSQL 16, Redis, SQLite |
| **Dev Tools** | neovim, docker, ngrok, direnv |

### GUI Applications
- Visual Studio Code
- iTerm2
- Rectangle (window management)
- Raycast (spotlight replacement)
- Postman
- TablePlus
- Docker Desktop
- Notion, Slack, Figma

### Fonts
- Fira Code Nerd Font
- JetBrains Mono Nerd Font
- Meslo LG Nerd Font
- Hack Nerd Font

## Installation

### 1. Run the Installation Script

```bash
cd ~/Developer/actarionwebsite/dev-setup
chmod +x install-dev-tools.sh
./install-dev-tools.sh
```

### 2. Install the Optimized ZSH Config

```bash
# Backup your current config
cp ~/.zshrc ~/.zshrc.backup

# Install the new config
cp optimized-zshrc.sh ~/.zshrc

# Reload
source ~/.zshrc
```

### 3. Configure Starship Prompt

```bash
mkdir -p ~/.config
cp starship.toml ~/.config/starship.toml
```

### 4. Authenticate GitHub CLI

```bash
gh auth login
```

## Key Features of the ZSH Config

### ⚡ Performance Optimizations
- **Lazy-loaded NVM** - Node/npm commands load NVM on first use, saving ~500ms startup time
- **Compiled completions** - zcompdump only rebuilds once per day
- **Efficient history** - Deduped, shared across sessions

### 🎨 Modern CLI Aliases
```bash
ls  → eza (with icons)
cat → bat (with syntax highlighting)
grep → ripgrep (super fast)
find → fd (intuitive syntax)
```

### 🔧 Git Shortcuts
```bash
gs    # git status -sb
gaa   # git add --all
gcm   # git commit -m
gp    # git push
gl    # git log (pretty)
lg    # lazygit
```

### 🐙 GitHub CLI Shortcuts
```bash
ghpr  # gh pr create
ghprl # gh pr list
ghis  # gh issue list
ghdb  # gh dash (dashboard)
```

### 🐳 Docker Shortcuts
```bash
dps   # docker ps
dc    # docker-compose
dlogs # docker logs -f
dexec # docker exec -it
```

### 📁 Utility Functions
```bash
mkcd <dir>      # mkdir + cd
extract <file>  # auto-extract any archive
serve [port]    # quick HTTP server
killport <port> # kill process on port
gclone <url>    # git clone + cd
backup <file>   # create timestamped backup
```

## Customization

### Adding Your Own Aliases
Add to the bottom of `~/.zshrc`:

```bash
# My custom aliases
alias myproject='cd ~/Developer/my-project && code .'
```

### Changing the Prompt Theme
Starship has many presets:

```bash
# Use a preset
starship preset nerd-font-symbols -o ~/.config/starship.toml

# Or Tokyo Night theme
starship preset tokyo-night -o ~/.config/starship.toml
```

### VS Code Settings Sync
Enable Settings Sync in VS Code to sync your extensions and settings across machines.

## Troubleshooting

### Slow Shell Startup
1. Check startup time: `time zsh -i -c exit`
2. Profile with: `zsh -xv`
3. Common fixes: lazy-load more tools, reduce plugins

### Icons Not Showing
Install a Nerd Font and configure your terminal to use it:
- iTerm2: Preferences → Profiles → Text → Font
- VS Code Terminal: `"terminal.integrated.fontFamily": "FiraCode Nerd Font"`

### NVM Not Found After Install
Add to `.zshrc`:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Maintenance

```bash
# Update Homebrew and packages
brew update && brew upgrade

# Update NVM
cd "$NVM_DIR" && git pull origin master

# Update Starship
brew upgrade starship
```

---

Made with ❤️ for developers who value a beautiful, efficient terminal.
