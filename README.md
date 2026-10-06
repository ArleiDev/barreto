# barreto

Landing page do **Barreto | Treinador** — Ponta Porã, MS.
Hipertrofia, emagrecimento, definição e treino personalizado (presencial e online).

HTML, CSS e JavaScript puros, sem frameworks e sem build.

## Estrutura

```
index.html        página
styles.css        estilos (mobile first)
script.js         interações, animações e links de WhatsApp
assets/img/       fotos (recorte do hero em webp)
```

## Configuração

No topo do `script.js`:

```js
const WHATSAPP_NUMBER = '5567999999999'; // DDI + DDD + número, só dígitos
const INSTAGRAM_URL = 'https://instagram.com/';
```

Cada botão usa o atributo `data-wa` com a mensagem que já vai preenchida no WhatsApp.

## Rodar localmente

Abra o `index.html` no navegador ou sirva a pasta:

```bash
npx http-server . -p 5531
```
