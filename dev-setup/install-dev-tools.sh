#!/bin/bash

# =============================================================================
# Professional Development Environment Setup Script
# Author: Automated Setup
# Description: Installs essential development tools via Homebrew
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}→ $1${NC}"
}

# =============================================================================
# Check for Homebrew and install if needed
# =============================================================================
print_header "Checking Homebrew Installation"

if ! command -v brew &> /dev/null; then
    print_warning "Homebrew not found. Installing..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == "arm64" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    print_success "Homebrew installed successfully"
else
    print_success "Homebrew is already installed"
    print_info "Updating Homebrew..."
    brew update
fi

# =============================================================================
# Install Command Line Tools
# =============================================================================
print_header "Installing Command Line Tools"

CLI_TOOLS=(
    # Version Control
    "git"                    # Version control system
    "gh"                     # GitHub CLI
    "git-lfs"                # Git Large File Storage
    "lazygit"                # Terminal UI for git
    
    # Shell & Terminal
    "zsh"                    # Z shell
    "starship"               # Cross-shell prompt
    "zsh-autosuggestions"    # Fish-like autosuggestions
    "zsh-syntax-highlighting" # Syntax highlighting for zsh
    "tmux"                   # Terminal multiplexer
    "fzf"                    # Fuzzy finder
    "bat"                    # Better cat with syntax highlighting
    "eza"                    # Modern ls replacement (formerly exa)
    "ripgrep"                # Super fast grep
    "fd"                     # Simple, fast find alternative
    "tree"                   # Directory tree viewer
    "jq"                     # JSON processor
    "yq"                     # YAML processor
    "htop"                   # Interactive process viewer
    "tldr"                   # Simplified man pages
    "watch"                  # Execute program periodically
    "wget"                   # File downloader
    "curl"                   # URL transfer tool
    
    # Development Tools
    "neovim"                 # Modern vim
    "docker"                 # Container platform
    "docker-compose"         # Docker orchestration
    "httpie"                 # HTTP client
    "ngrok"                  # Expose local servers
    "direnv"                 # Directory-specific env vars
    
    # Database Tools
    "postgresql@16"          # PostgreSQL database
    "redis"                  # In-memory data store
    "sqlite"                 # Lightweight database
    
    # Network Tools
    "mtr"                    # Network diagnostic tool
    "nmap"                   # Network scanner
    
    # Misc Utilities  
    "coreutils"              # GNU core utilities
    "gnupg"                  # GPG encryption
    "openssh"                # SSH tools
    "openssl"                # SSL/TLS toolkit
    "imagemagick"            # Image manipulation
    "ffmpeg"                 # Video/audio processing
)

for tool in "${CLI_TOOLS[@]}"; do
    # Extract tool name (before #)
    tool_name=$(echo "$tool" | cut -d'#' -f1 | xargs)
    
    if brew list "$tool_name" &> /dev/null; then
        print_success "$tool_name is already installed"
    else
        print_info "Installing $tool_name..."
        if brew install "$tool_name"; then
            print_success "$tool_name installed successfully"
        else
            print_error "Failed to install $tool_name"
        fi
    fi
done

# =============================================================================
# Install Version Managers
# =============================================================================
print_header "Installing Version Managers"

# NVM (Node Version Manager)
print_info "Installing NVM..."
if [ -d "$HOME/.nvm" ]; then
    print_success "NVM is already installed"
else
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    print_success "NVM installed successfully"
fi

# pyenv (Python Version Manager)
if brew list pyenv &> /dev/null; then
    print_success "pyenv is already installed"
else
    print_info "Installing pyenv..."
    brew install pyenv
    brew install pyenv-virtualenv
    print_success "pyenv installed successfully"
fi

# rbenv (Ruby Version Manager) - optional but useful
if brew list rbenv &> /dev/null; then
    print_success "rbenv is already installed"
else
    print_info "Installing rbenv..."
    brew install rbenv ruby-build
    print_success "rbenv installed successfully"
fi

# =============================================================================
# Install GUI Applications (Casks)
# =============================================================================
print_header "Installing GUI Applications"

CASK_APPS=(
    "visual-studio-code"     # Code editor
    "iterm2"                 # Better terminal
    "rectangle"              # Window management
    "raycast"                # Spotlight replacement
    "postman"                # API testing
    "tableplus"              # Database GUI
    "notion"                 # Notes & docs
    "slack"                  # Team communication
    "figma"                  # Design tool
    "docker"                 # Docker Desktop
)

for app in "${CASK_APPS[@]}"; do
    app_name=$(echo "$app" | cut -d'#' -f1 | xargs)
    
    if brew list --cask "$app_name" &> /dev/null 2>&1; then
        print_success "$app_name is already installed"
    else
        print_info "Installing $app_name..."
        if brew install --cask "$app_name" 2>/dev/null; then
            print_success "$app_name installed successfully"
        else
            print_warning "Skipped $app_name (may already exist or unavailable)"
        fi
    fi
done

# =============================================================================
# Install Fonts
# =============================================================================
print_header "Installing Developer Fonts"

# Tap the fonts cask
brew tap homebrew/cask-fonts 2>/dev/null || true

FONTS=(
    "font-fira-code-nerd-font"
    "font-jetbrains-mono-nerd-font"
    "font-meslo-lg-nerd-font"
    "font-hack-nerd-font"
)

for font in "${FONTS[@]}"; do
    if brew list --cask "$font" &> /dev/null 2>&1; then
        print_success "$font is already installed"
    else
        print_info "Installing $font..."
        brew install --cask "$font" 2>/dev/null || print_warning "Skipped $font"
    fi
done

# =============================================================================
# Setup GitHub CLI
# =============================================================================
print_header "Configuring GitHub CLI"

if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null; then
        print_success "GitHub CLI is already authenticated"
    else
        print_warning "GitHub CLI installed but not authenticated"
        print_info "Run 'gh auth login' to authenticate"
    fi
    
    # Install useful gh extensions
    print_info "Installing GitHub CLI extensions..."
    gh extension install github/gh-copilot 2>/dev/null || true
    gh extension install dlvhdr/gh-dash 2>/dev/null || true
    print_success "GitHub CLI extensions installed"
fi

# =============================================================================
# Install Latest Stable Versions
# =============================================================================
print_header "Installing Latest Stable Language Versions"

# Install latest Node.js LTS via NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

if command -v nvm &> /dev/null; then
    print_info "Installing Node.js LTS..."
    nvm install --lts
    nvm use --lts
    nvm alias default 'lts/*'
    print_success "Node.js LTS installed and set as default"
    
    # Install global npm packages
    print_info "Installing global npm packages..."
    npm install -g pnpm yarn typescript ts-node nodemon npm-check-updates
    print_success "Global npm packages installed"
fi

# Install latest Python via pyenv
if command -v pyenv &> /dev/null; then
    print_info "Installing latest Python..."
    LATEST_PYTHON=$(pyenv install --list | grep -E "^\s*3\.[0-9]+\.[0-9]+$" | tail -1 | xargs)
    if [ -n "$LATEST_PYTHON" ]; then
        pyenv install -s "$LATEST_PYTHON"
        pyenv global "$LATEST_PYTHON"
        print_success "Python $LATEST_PYTHON installed and set as global"
    fi
    
    # Install essential Python tools
    print_info "Installing Python tools..."
    pip install --upgrade pip
    pip install pipx poetry black ruff mypy pytest ipython
    print_success "Python tools installed"
fi

# =============================================================================
# Final Setup
# =============================================================================
print_header "Finalizing Setup"

# Run fzf install script
if [ -f "$(brew --prefix)/opt/fzf/install" ]; then
    print_info "Setting up fzf..."
    $(brew --prefix)/opt/fzf/install --all --no-bash --no-fish
fi

# Initialize tldr
if command -v tldr &> /dev/null; then
    print_info "Updating tldr cache..."
    tldr --update 2>/dev/null || true
fi

print_header "🎉 Installation Complete!"

echo -e "${GREEN}Your development environment has been configured with:${NC}"
echo ""
echo "  • Homebrew package manager"
echo "  • Git + GitHub CLI (gh)"
echo "  • NVM (Node Version Manager) with latest LTS"
echo "  • pyenv (Python Version Manager) with latest Python"
echo "  • rbenv (Ruby Version Manager)"
echo "  • Modern CLI tools (eza, bat, ripgrep, fzf, etc.)"
echo "  • Development applications"
echo "  • Nerd Fonts for terminal icons"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Copy the optimized .zshrc to your home directory:"
echo "     cp ./optimized-zshrc.sh ~/.zshrc"
echo ""
echo "  2. Restart your terminal or run:"
echo "     source ~/.zshrc"
echo ""
echo "  3. Authenticate GitHub CLI:"
echo "     gh auth login"
echo ""
echo "  4. Configure Starship prompt (optional):"
echo "     starship preset nerd-font-symbols -o ~/.config/starship.toml"
echo ""
