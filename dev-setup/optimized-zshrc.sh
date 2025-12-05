# =============================================================================
#  Professional ZSH Configuration
#  Optimized for speed and developer productivity
# =============================================================================

# -----------------------------------------------------------------------------
# Performance: Compile zcompdump for faster startup
# -----------------------------------------------------------------------------
autoload -Uz compinit
if [ $(date +'%j') != $(stat -f '%Sm' -t '%j' ~/.zcompdump 2>/dev/null) ]; then
    compinit
else
    compinit -C
fi

# -----------------------------------------------------------------------------
# Homebrew Configuration
# -----------------------------------------------------------------------------
if [[ $(uname -m) == "arm64" ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    eval "$(/usr/local/bin/brew shellenv)"
fi

# -----------------------------------------------------------------------------
# History Configuration
# -----------------------------------------------------------------------------
HISTFILE=~/.zsh_history
HISTSIZE=50000
SAVEHIST=50000
setopt EXTENDED_HISTORY          # Write the history file in the ':start:elapsed;command' format
setopt HIST_EXPIRE_DUPS_FIRST    # Expire a duplicate event first when trimming history
setopt HIST_FIND_NO_DUPS         # Do not display a previously found event
setopt HIST_IGNORE_ALL_DUPS      # Delete an old recorded event if a new event is a duplicate
setopt HIST_IGNORE_DUPS          # Do not record an event that was just recorded again
setopt HIST_IGNORE_SPACE         # Do not record an event starting with a space
setopt HIST_SAVE_NO_DUPS         # Do not write a duplicate event to the history file
setopt HIST_VERIFY               # Do not execute immediately upon history expansion
setopt INC_APPEND_HISTORY        # Write to the history file immediately, not when the shell exits
setopt SHARE_HISTORY             # Share history between all sessions

# -----------------------------------------------------------------------------
# Shell Options
# -----------------------------------------------------------------------------
setopt AUTO_CD                   # Change directory without cd
setopt AUTO_PUSHD                # Push directories onto stack
setopt PUSHD_IGNORE_DUPS         # Do not store duplicates in the stack
setopt PUSHD_SILENT              # Do not print the directory stack after pushd or popd
setopt CORRECT                   # Spelling correction for commands
setopt INTERACTIVE_COMMENTS      # Allow comments in interactive shell
setopt NO_BEEP                   # No beeping

# -----------------------------------------------------------------------------
# NVM (Node Version Manager) - Lazy Loading for Speed
# -----------------------------------------------------------------------------
export NVM_DIR="$HOME/.nvm"
export NVM_LAZY_LOAD=true

# Lazy load NVM
nvm() {
    unset -f nvm node npm npx pnpm yarn
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm "$@"
}

node() {
    unset -f nvm node npm npx pnpm yarn
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    node "$@"
}

npm() {
    unset -f nvm node npm npx pnpm yarn
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    npm "$@"
}

npx() {
    unset -f nvm node npm npx pnpm yarn
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    npx "$@"
}

pnpm() {
    unset -f nvm node npm npx pnpm yarn
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    pnpm "$@"
}

yarn() {
    unset -f nvm node npm npx pnpm yarn
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    yarn "$@"
}

# -----------------------------------------------------------------------------
# pyenv (Python Version Manager)
# -----------------------------------------------------------------------------
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
if command -v pyenv &> /dev/null; then
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)" 2>/dev/null || true
fi

# -----------------------------------------------------------------------------
# rbenv (Ruby Version Manager)
# -----------------------------------------------------------------------------
if command -v rbenv &> /dev/null; then
    eval "$(rbenv init - zsh)"
fi

# -----------------------------------------------------------------------------
# Path Configuration
# -----------------------------------------------------------------------------
typeset -U path  # Ensure unique entries
path=(
    $HOME/.local/bin
    $HOME/bin
    /usr/local/bin
    /usr/local/sbin
    $path
)

# -----------------------------------------------------------------------------
# Editor Configuration
# -----------------------------------------------------------------------------
export EDITOR='nvim'
export VISUAL='code'
export PAGER='less'
export LESS='-R --mouse --wheel-lines=3'

# Use bat as man pager with syntax highlighting
export MANPAGER="sh -c 'col -bx | bat -l man -p'"
export BAT_THEME="Catppuccin-mocha"

# -----------------------------------------------------------------------------
# Modern CLI Tool Aliases
# -----------------------------------------------------------------------------
# Use eza instead of ls (if available)
if command -v eza &> /dev/null; then
    alias ls='eza --icons --group-directories-first'
    alias ll='eza -la --icons --group-directories-first --git'
    alias la='eza -la --icons --group-directories-first'
    alias lt='eza --tree --icons --level=2'
    alias lta='eza --tree --icons --level=2 -a'
else
    alias ls='ls -G'
    alias ll='ls -lah'
    alias la='ls -a'
fi

# Use bat instead of cat
if command -v bat &> /dev/null; then
    alias cat='bat --paging=never'
    alias catp='bat --plain'
fi

# Use ripgrep instead of grep
if command -v rg &> /dev/null; then
    alias grep='rg'
fi

# Use fd instead of find
if command -v fd &> /dev/null; then
    alias find='fd'
fi

# -----------------------------------------------------------------------------
# Git Aliases
# -----------------------------------------------------------------------------
alias g='git'
alias gs='git status -sb'
alias ga='git add'
alias gaa='git add --all'
alias gc='git commit'
alias gcm='git commit -m'
alias gca='git commit --amend'
alias gco='git checkout'
alias gcb='git checkout -b'
alias gb='git branch'
alias gba='git branch -a'
alias gbd='git branch -d'
alias gp='git push'
alias gpf='git push --force-with-lease'
alias gpl='git pull'
alias gf='git fetch'
alias gfa='git fetch --all --prune'
alias gm='git merge'
alias gr='git rebase'
alias gri='git rebase -i'
alias gd='git diff'
alias gds='git diff --staged'
alias gl='git log --oneline --graph --decorate -15'
alias gla='git log --oneline --graph --decorate --all'
alias glo='git log --pretty=format:"%C(yellow)%h%Creset %C(green)(%cr)%Creset %C(bold blue)<%an>%Creset %s" -15'
alias gst='git stash'
alias gstp='git stash pop'
alias gstl='git stash list'
alias grh='git reset HEAD~'
alias grhh='git reset --hard HEAD~'
alias gclean='git clean -fd'
alias gwip='git add -A && git commit -m "WIP"'

# Lazygit
alias lg='lazygit'

# -----------------------------------------------------------------------------
# GitHub CLI Aliases
# -----------------------------------------------------------------------------
alias ghpr='gh pr create'
alias ghprl='gh pr list'
alias ghprc='gh pr checkout'
alias ghprv='gh pr view --web'
alias ghis='gh issue list'
alias ghic='gh issue create'
alias ghiv='gh issue view'
alias ghrc='gh repo clone'
alias ghrv='gh repo view --web'
alias ghdb='gh dash'  # gh-dash extension

# -----------------------------------------------------------------------------
# Docker Aliases
# -----------------------------------------------------------------------------
alias d='docker'
alias dc='docker-compose'
alias dps='docker ps'
alias dpsa='docker ps -a'
alias di='docker images'
alias drm='docker rm'
alias drmi='docker rmi'
alias dprune='docker system prune -af'
alias dlogs='docker logs -f'
alias dexec='docker exec -it'

# -----------------------------------------------------------------------------
# Development Aliases
# -----------------------------------------------------------------------------
alias c='code .'
alias v='nvim'
alias vim='nvim'
alias python='python3'
alias pip='pip3'
alias py='python3'

# NPM/Yarn/PNPM shortcuts
alias nr='npm run'
alias nrd='npm run dev'
alias nrb='npm run build'
alias nrt='npm run test'
alias ni='npm install'
alias nci='npm ci'
alias pn='pnpm'
alias pni='pnpm install'
alias pnd='pnpm dev'
alias pnb='pnpm build'

# -----------------------------------------------------------------------------
# Navigation Aliases
# -----------------------------------------------------------------------------
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ~='cd ~'
alias -- -='cd -'

# Quick directory access
alias dev='cd ~/Developer'
alias dl='cd ~/Downloads'
alias dt='cd ~/Desktop'
alias docs='cd ~/Documents'

# -----------------------------------------------------------------------------
# System Aliases
# -----------------------------------------------------------------------------
alias reload='source ~/.zshrc && echo "✓ ZSH config reloaded"'
alias zshrc='$EDITOR ~/.zshrc'
alias hosts='sudo $EDITOR /etc/hosts'
alias flush='sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder && echo "✓ DNS cache flushed"'
alias ip='curl -s ipinfo.io/ip'
alias localip='ipconfig getifaddr en0'
alias ports='lsof -i -P -n | grep LISTEN'
alias top='htop'
alias du='du -sh'
alias df='df -h'
alias h='history'
alias j='jobs -l'
alias path='echo -e ${PATH//:/\\n}'
alias now='date +"%Y-%m-%d %H:%M:%S"'
alias week='date +%V'
alias weather='curl -s "wttr.in?format=3"'

# Cleanup
alias cleanup='find . -type f -name "*.DS_Store" -ls -delete'
alias emptytrash='sudo rm -rfv /Volumes/*/.Trashes; sudo rm -rfv ~/.Trash; sudo rm -rfv /private/var/log/asl/*.asl'

# -----------------------------------------------------------------------------
# Utility Functions
# -----------------------------------------------------------------------------

# Create directory and cd into it
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Extract various archive types
extract() {
    if [ -f "$1" ]; then
        case "$1" in
            *.tar.bz2)   tar xjf "$1"     ;;
            *.tar.gz)    tar xzf "$1"     ;;
            *.bz2)       bunzip2 "$1"     ;;
            *.rar)       unrar x "$1"     ;;
            *.gz)        gunzip "$1"      ;;
            *.tar)       tar xf "$1"      ;;
            *.tbz2)      tar xjf "$1"     ;;
            *.tgz)       tar xzf "$1"     ;;
            *.zip)       unzip "$1"       ;;
            *.Z)         uncompress "$1"  ;;
            *.7z)        7z x "$1"        ;;
            *)           echo "'$1' cannot be extracted via extract()" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}

# Quick HTTP server
serve() {
    local port="${1:-8000}"
    python3 -m http.server "$port"
}

# Kill process on port
killport() {
    lsof -ti:$1 | xargs kill -9 2>/dev/null && echo "✓ Killed process on port $1" || echo "✗ No process found on port $1"
}

# Git clone and cd
gclone() {
    git clone "$1" && cd "$(basename "$1" .git)"
}

# Create a new git branch with issue number
gbranch() {
    git checkout -b "feature/$1"
}

# Quick commit with message
gquick() {
    git add -A && git commit -m "$*" && git push
}

# Find and replace in files
replace() {
    find . -type f -name "*.$3" -exec sed -i '' "s/$1/$2/g" {} +
}

# Backup file with timestamp
backup() {
    cp "$1" "$1.$(date +%Y%m%d_%H%M%S).bak"
}

# Show weather for a location
wttr() {
    curl -s "wttr.in/${1:-}?format=%l:+%c+%t+%h+%w"
}

# Quick note
note() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $*" >> ~/notes.md
}

# JSON pretty print
json() {
    if [ -t 0 ]; then
        cat "$1" | jq .
    else
        jq .
    fi
}

# Watch file changes
watchfile() {
    while true; do
        clear
        cat "$1"
        sleep "${2:-2}"
    done
}

# -----------------------------------------------------------------------------
# FZF Configuration
# -----------------------------------------------------------------------------
if command -v fzf &> /dev/null; then
    # Use fd for fzf if available
    if command -v fd &> /dev/null; then
        export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
        export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
        export FZF_ALT_C_COMMAND='fd --type d --hidden --follow --exclude .git'
    fi
    
    export FZF_DEFAULT_OPTS="
        --height 60%
        --layout=reverse
        --border rounded
        --info=inline
        --preview 'bat --color=always --style=numbers --line-range=:500 {} 2>/dev/null || cat {}'
        --preview-window=right:50%:wrap
        --bind='ctrl-/:toggle-preview'
        --color=bg+:#313244,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8
        --color=fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc
        --color=marker:#f5e0dc,fg+:#cdd6f4,prompt:#cba6f7,hl+:#f38ba8
    "
    
    # Source fzf completions
    [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
fi

# -----------------------------------------------------------------------------
# ZSH Plugins (from Homebrew)
# -----------------------------------------------------------------------------
# Syntax highlighting - must be loaded before autosuggestions
[ -f $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ] && \
    source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Autosuggestions
[ -f $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh ] && \
    source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# Configure autosuggestions
ZSH_AUTOSUGGEST_STRATEGY=(history completion)
ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=20
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=8'

# -----------------------------------------------------------------------------
# Completion System
# -----------------------------------------------------------------------------
zstyle ':completion:*' completer _expand _complete _ignored _approximate
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'
zstyle ':completion:*' menu select
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion:*:descriptions' format '%F{yellow}-- %d --%f'
zstyle ':completion:*:warnings' format '%F{red}No matches found%f'
zstyle ':completion:*' group-name ''
zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;31'
zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'

# Enable completion caching
zstyle ':completion:*' use-cache on
zstyle ':completion:*' cache-path ~/.zsh/cache

# -----------------------------------------------------------------------------
# Key Bindings
# -----------------------------------------------------------------------------
bindkey -e  # Emacs key bindings
bindkey '^[[A' history-search-backward  # Up arrow
bindkey '^[[B' history-search-forward   # Down arrow
bindkey '^[[H' beginning-of-line        # Home
bindkey '^[[F' end-of-line              # End
bindkey '^[[3~' delete-char             # Delete
bindkey '^[b' backward-word             # Alt+Left
bindkey '^[f' forward-word              # Alt+Right
bindkey '^[[1;5C' forward-word          # Ctrl+Right
bindkey '^[[1;5D' backward-word         # Ctrl+Left

# -----------------------------------------------------------------------------
# direnv (per-directory environment)
# -----------------------------------------------------------------------------
if command -v direnv &> /dev/null; then
    eval "$(direnv hook zsh)"
fi

# -----------------------------------------------------------------------------
# Starship Prompt
# -----------------------------------------------------------------------------
if command -v starship &> /dev/null; then
    eval "$(starship init zsh)"
fi

# -----------------------------------------------------------------------------
# Welcome Message
# -----------------------------------------------------------------------------
if [[ -o interactive ]]; then
    echo ""
    echo "  \033[1;34m█▀▀█ █▀▀█ █▀▀█ █▀▀ █▀▀ █▀▀ █▀▀ ░▀░ █▀▀█ █▀▀▄ █▀▀█ █░░\033[0m"
    echo "  \033[1;34m█░░█ █▄▄▀ █░░█ █▀▀ █▀▀ ▀▀█ ▀▀█ ▀█▀ █░░█ █░░█ █▄▄█ █░░\033[0m"  
    echo "  \033[1;34m█▀▀▀ ▀░▀▀ ▀▀▀▀ ▀░░ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀▀ ▀░░▀ ▀░░▀ ▀▀▀\033[0m"
    echo ""
    echo "  \033[0;90m$(date '+%A, %B %d, %Y') | Node: $(node -v 2>/dev/null || echo 'N/A') | Python: $(python3 --version 2>/dev/null | cut -d' ' -f2 || echo 'N/A')\033[0m"
    echo ""
fi
