# Code Editor Component - Discovery & Action Plan

## 1. Context

**Objetivo**: Evoluir o `CodeEditor` (textarea simples) para um editor profissional com syntax highlighting e detecção automática de linguagem.

**Estado atual**:
- `CodeEditor`: Textarea básica com line numbers (sem highlighting)
- `CodeBlock`: Display read-only com Shiki para highlighting
- Dependência existente: `shiki@^4.0.2`

---

## 2. Research: Code Editor Libraries

### Comparação de Editores

| Feature | Monaco Editor | CodeMirror 6 | Ace Editor |
|---------|---------------|--------------|------------|
| **Bundle Size** | ~3-5MB (pesado) | ~150KB-1MB | ~500KB |
| **Syntax Highlighting** | Built-in | Via extensões | Built-in |
| **IntelliSense** | Sim (completo) | Plugin-based | Básico |
| **Linguagens** | 60+ | Requer packages | 40+ |
| **Mobile Support** | Limitado | Excelente | Médio |
| **Customização** | Limitada | Extremamente flexível | Média |
| **Manutenção** | Microsoft | Ativa (Marijn) | Baixa |
| **React 19 Support** | `@monaco-editor/react@next` | `@codemirror/react` | `react-ace` |

### Detalhes por Biblioteca

#### Monaco Editor (`@monaco-editor/react`)
```bash
npm install @monaco-editor/react
```
- **Prós**: Experiência VS Code, IntelliSense completo, minimap
- **Contras**: Bundle muito pesado (~5MB), carregamento lento
- **Recomendado para**: IDEs full-featured, apps desktop-first

#### CodeMirror 6 (`@codemirror/react`)
```bash
npm install @codemirror/react @codemirror/state @codemirror/view
npm install @codemirror/lang-javascript @codemirror/lang-python
npm install @codemirror/lang-css @codemirror/lang-html
```
- **Prós**: Leve, modular, excelente mobile, React-idiomatico
- **Contras**: Mais setup inicial, features são extensões
- **Recomendado para**: Apps leves, mobile-first, customização

#### Ace Editor (`react-ace`)
```bash
npm install react-ace
```
- **Prós**: Fácil setup, muitas linguagens
- **Contras**: Manutenção baixa, arquitetura antiga
- **Recomendado para**: Quick prototypes

---

## 3. Research: Language Detection

| Library | Size | Accuracy | Dependencies | Languages |
|---------|------|----------|--------------|-----------|
| **flourite** | ~10KB | Boa | Nenhuma | 20+ |
| **guesslang-js** | ~1MB | Alta (ML) | TensorFlow.js | 50+ |
| **highlight.js** | ~40KB | Média | Nenhuma | 180+ |
| **shiki** | já instalado | Alta | Nenhuma | 100+ |

### Detalhes

#### flourite (Recomendado)
```bash
npm install flourite
```
- Leve, sem deps, TypeScript nativo
- Output compatível com Shiki (`shiki: true`)
- 20+ linguagens: JS, TS, Python, Rust, Go, C++, etc.

#### guesslang-js
- ML-based, mais preciso
- ~1MB com TensorFlow.js
- Sobrekill para este caso de uso

---

## 4. Recommendation

### Stack Escolhida

| Componente | Biblioteca | Justificativa |
|------------|------------|---------------|
| Editor | **CodeMirror 6** | Leve, moderno, excelente React 19 support, pode usar Shiki grammars |
| Language Detection | **flourite** | Leve, já retorna output compatível com Shiki |
| Syntax Themes | **Shiki themes** | Já instalado, 100+ temas |

### Por que CodeMirror 6 (vs Monaco)?

1. **Bundle size**: 150KB vs 5MB (33x menor)
2. **React 19**: Suporte nativo via `@codemirror/react`
3. **Extensibilidade**: Arquitetura modular perfeita para customização
4. **Shiki Integration**: CodeMirror pode usar TextMate grammars do Shiki
5. **Mobile**: Suporte nativo, Monaco não funciona bem em mobile

### Arquitetura Proposta

```
CodeEditor (componente principal)
├── CodeMirror 6 (editor real)
│   ├── Syntax highlighting (via @codemirror/language)
│   ├── Line numbers
│   ├── Code folding (colapsar blocos)
│   ├── Auto-indentation
│   ├── Auto-close brackets/quotes
│   └── Custom keybindings
├── Language Detection (flourite)
│   └── Detecta linguagem automaticamente
└── UI Chrome
    ├── Window header (mac buttons)
    ├── Language selector (dropdown)
    └── Actions (copy, clear)
```

---

## 5. Action Plan

### Fase 1: Setup e MVP
- [ ] Instalar dependências CodeMirror 6
- [ ] Criar `CodeEditor` básico com CodeMirror
- [ ] Adicionar syntax highlighting básico
- [ ] Integrar com UI existente (window header)

### Fase 2: Language Detection
- [ ] Instalar `flourite`
- [ ] Implementar auto-detection on change
- [ ] Adicionar language selector manual
- [ ] Sincronizar com Shiki themes

### Fase 3: Features Avançadas
- [ ] Code folding (colapsar blocos)
- [ ] Auto-indentation (formatação ao digitar)
- [ ] Auto-close brackets/quotes
- [ ] Adicionar copy to clipboard
- [ ] Line highlighting (on hover)
- [ ] Suporte a keyboard shortcuts
- [ ] Debounce para language detection

### Fase 4: Polish
- [ ] Adicionar loading states
- [ ] Error boundaries
- [ ] A11y improvements
- [ ] Performance optimization

---

## 6. Install Commands

```bash
# Core CodeMirror
npm install @codemirror/react @codemirror/state @codemirror/view
npm install @codemirror/commands @codemirror/language
npm install @codemirror/autocomplete

# Language support (Top 20 linguagens mais populares)
npm install @codemirror/lang-javascript  # JavaScript, TypeScript
npm install @codemirror/lang-python      # Python
npm install @codemirror/lang-java        # Java
npm install @codemirror/lang-cpp         # C++
npm install @codemirror/lang-rust        # Rust
npm install @codemirror/lang-go         # Go
npm install @codemirror/lang-php        # PHP
npm install @codemirror/lang-html       # HTML
npm install @codemirror/lang-css        # CSS
npm install @codemirror/lang-sql        # SQL
npm install @codemirror/lang-json       # JSON
npm install @codemirror/lang-markdown    # Markdown
npm install @codemirror/lang-xml        # XML
npm install @codemirror/lang-yaml       # YAML
npm install @codemirror/lang-r           # R
npm install @codemirror/lang-swift      # Swift
npm install @codemirror/lang-kotlin     # Kotlin
npm install @codemirror/lang-sass        # Sass/SCSS
npm install @codemirror/lang-c           # C
npm install @codemirror/lang-bash        # Shell/Bash

# Language detection
npm install flourite

# Code formatting
npm install @codemirror/lang-python # Python formatting via Black (server-side)
# Para outras linguagens: usar Prettier (server-side)
```

---

## 7. Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/code-editor.tsx` | Modify | Substituir textarea por CodeMirror |
| `src/hooks/use-language-detect.ts` | Create | Hook para detecção de linguagem |
| `src/lib/codemirror-theme.ts` | Create | Shiki theme adapter para CM6 |
| `src/app/components/page.tsx` | Modify | Atualizar showcase |
| `src/app/components/code-editor-demo.tsx` | Create | Demo do editor |

---

## 8. Considerações Técnicas

### SSR Support
CodeMirror é client-only. Usar dynamic import:
```tsx
const CodeMirror = dynamic(() => import('@codemirror/react'), { ssr: false });
```

### Performance
- Language detection: debounce 300ms
- Highlighting: assíncrono para grandes arquivos

### Acessibilidade
- CodeMirror 6 tem boa integração com screen readers
- Manter UI de fallback para SSR
