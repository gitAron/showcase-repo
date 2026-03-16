const express = require('express');
const { WebSocketServer } = require('ws');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const SESSIONS_DIR = '/workspace/.sessions';
fs.mkdirSync(SESSIONS_DIR, { recursive: true });

// Serve chat UI
app.use('/chat', express.static(path.join(__dirname, 'public')));

// File browser API
app.get('/files/api', (req, res) => {
  const reqPath = path.normalize('/' + (req.query.path || ''));
  try {
    const entries = fs.readdirSync(reqPath, { withFileTypes: true }).map(e => ({
      name: e.name,
      isDir: e.isDirectory(),
      path: path.join(reqPath, e.name)
    })).sort((a, b) => (b.isDir - a.isDir) || a.name.localeCompare(b.name));
    res.json({ path: reqPath, entries });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/files/raw', (req, res) => {
  const reqPath = path.normalize('/' + (req.query.path || ''));
  try {
    const stat = fs.statSync(reqPath);
    if (stat.isDirectory()) return res.status(400).json({ error: 'Is a directory' });
    res.sendFile(reqPath);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

// File browser UI
app.get('/files', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>File Browser</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0e0818; --panel: #1c1430; --border: #2e2050;
      --text: #e8e8e8; --muted: #7a6a99; --accent: #d97706; --accent2: #a78bfa;
    }
    html, body { height: 100%; background: var(--bg); color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
    body { display: flex; flex-direction: column; height: 100vh; }
    header { padding: 14px 20px; border-bottom: 1px solid var(--border);
      display: flex; align-items: center; gap: 16px; background: var(--bg); }
    header a { color: var(--accent); text-decoration: none; font-weight: 700; font-size: 16px; }
    header a:hover { color: var(--accent2); }
    #breadcrumb { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
    #breadcrumb span { cursor: pointer; color: var(--accent2); }
    #breadcrumb span:hover { text-decoration: underline; }
    #breadcrumb .sep { color: var(--muted); }
    #main { display: flex; flex: 1; overflow: hidden; }
    #file-list { width: 320px; min-width: 200px; border-right: 1px solid var(--border);
      overflow-y: auto; padding: 8px; }
    #file-list::-webkit-scrollbar { width: 4px; }
    #file-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    .entry { display: flex; align-items: center; gap: 8px; padding: 7px 10px;
      border-radius: 6px; cursor: pointer; font-size: 13px; }
    .entry:hover { background: var(--panel); }
    .entry.active { background: var(--panel); border: 1px solid var(--border); }
    .entry .icon { font-size: 15px; flex-shrink: 0; }
    .entry .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .entry.dir .name { color: var(--accent2); }
    #preview { flex: 1; overflow: auto; padding: 20px; }
    #preview::-webkit-scrollbar { width: 4px; }
    #preview::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
    #preview pre { white-space: pre-wrap; word-break: break-all; font-family: 'Fira Mono', 'Cascadia Code', monospace;
      font-size: 13px; line-height: 1.6; color: var(--text); }
    #preview .placeholder { color: var(--muted); font-size: 14px; margin-top: 40px; text-align: center; }
    #preview .err { color: #f87171; font-size: 13px; }
    .download-btn { display: inline-block; margin-bottom: 12px; padding: 5px 14px;
      background: var(--accent); color: #000; border-radius: 6px; font-size: 12px;
      font-weight: 600; text-decoration: none; cursor: pointer; border: none; }
    .download-btn:hover { background: #f59e0b; }
    @media (max-width: 600px) {
      #file-list { width: 160px; }
      #preview { padding: 12px; }
    }
  </style>
</head>
<body>
<header>
  <a href="/files">Files</a>
  <div id="breadcrumb"></div>
</header>
<div id="main">
  <div id="file-list"></div>
  <div id="preview"><p class="placeholder">Select a file to preview</p></div>
</div>
<script>
  let currentPath = '/';

  async function navigate(p) {
    currentPath = p;
    renderBreadcrumb(p);
    const list = document.getElementById('file-list');
    list.innerHTML = '<div class="entry"><span class="icon">⏳</span><span class="name">Loading...</span></div>';
    try {
      const res = await fetch('/files/api?path=' + encodeURIComponent(p));
      const data = await res.json();
      if (data.error) { list.innerHTML = '<div class="entry err">' + data.error + '</div>'; return; }
      list.innerHTML = '';
      if (p !== '/') {
        const up = document.createElement('div');
        up.className = 'entry dir';
        up.innerHTML = '<span class="icon">↩</span><span class="name">..</span>';
        up.onclick = () => navigate(p.split('/').slice(0, -1).join('/') || '/');
        list.appendChild(up);
      }
      data.entries.forEach(e => {
        const el = document.createElement('div');
        el.className = 'entry ' + (e.isDir ? 'dir' : 'file');
        el.innerHTML = '<span class="icon">' + (e.isDir ? '📁' : '📄') + '</span><span class="name">' + e.name + '</span>';
        el.title = e.path;
        el.onclick = () => e.isDir ? navigate(e.path) : previewFile(e.path, el);
        list.appendChild(el);
      });
    } catch(err) {
      list.innerHTML = '<div class="entry" style="color:#f87171">' + err.message + '</div>';
    }
  }

  async function previewFile(p, el) {
    document.querySelectorAll('.entry.active').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
    const preview = document.getElementById('preview');
    preview.innerHTML = '<p class="placeholder">Loading...</p>';
    const url = '/files/raw?path=' + encodeURIComponent(p);
    try {
      const res = await fetch(url);
      const ct = res.headers.get('content-type') || '';
      if (ct.startsWith('image/')) {
        preview.innerHTML = '<a class="download-btn" href="' + url + '" download>Download</a><br><img src="' + url + '" style="max-width:100%;border-radius:8px">';
        return;
      }
      const text = await res.text();
      preview.innerHTML =
        '<a class="download-btn" href="' + url + '" download>Download</a>' +
        '<pre>' + text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</pre>';
    } catch(err) {
      preview.innerHTML = '<p class="err">' + err.message + '</p>';
    }
  }

  function renderBreadcrumb(p) {
    const bc = document.getElementById('breadcrumb');
    const parts = p.split('/').filter(Boolean);
    let html = '<span onclick="navigate(\\'/\\')">/ </span>';
    parts.forEach((part, i) => {
      const full = '/' + parts.slice(0, i+1).join('/');
      html += '<span class="sep">/</span><span onclick="navigate(\\'' + full + '\\')">' + part + '</span>';
    });
    bc.innerHTML = html;
  }

  navigate('/');
</script>
</body>
</html>`);
});

// Serve MTG Commander Life Counter
app.use('/mtg', express.static('/workspace/mtg-commander-life'));

// Serve LOTR Commander Deck
app.use('/lotr', express.static('/workspace/lotr'));

// Serve LOTR Pong Game
app.use('/pong', express.static('/workspace/pong'));

// Serve existing www content at root
app.use(express.static('/workspace/www'));

// API: list sessions
app.get('/api/sessions', (req, res) => {
  try {
    const files = fs.readdirSync(SESSIONS_DIR).filter(f => f.endsWith('.json'));
    const sessions = files.map(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(SESSIONS_DIR, f)));
        return {
          id: data.id,
          name: data.name,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          messageCount: data.messages.length,
          claudeConversationId: data.claudeConversationId || null
        };
      } catch { return null; }
    }).filter(Boolean).sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    res.json(sessions);
  } catch (e) {
    res.json([]);
  }
});

// API: get session
app.get('/api/sessions/:id', (req, res) => {
  const file = path.join(SESSIONS_DIR, `${req.params.id}.json`);
  if (fs.existsSync(file)) {
    res.json(JSON.parse(fs.readFileSync(file)));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// API: delete session
app.delete('/api/sessions/:id', (req, res) => {
  const file = path.join(SESSIONS_DIR, `${req.params.id}.json`);
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    res.json({ ok: true });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// WebSocket: chat
wss.on('connection', (ws) => {
  let activeProc = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'chat') {
      const userMessage = msg.message;
      const sessionId = msg.sessionId || uuidv4();

      // Load or create session
      const sessionFile = path.join(SESSIONS_DIR, `${sessionId}.json`);
      let session;
      if (fs.existsSync(sessionFile)) {
        session = JSON.parse(fs.readFileSync(sessionFile));
      } else {
        session = {
          id: sessionId,
          name: userMessage.slice(0, 60),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: []
        };
      }

      session.messages.push({ role: 'user', content: userMessage, timestamp: new Date().toISOString() });
      session.updatedAt = new Date().toISOString();
      fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));

      // Tell client which session we're using + status
      ws.send(JSON.stringify({ type: 'session', sessionId }));
      ws.send(JSON.stringify({ type: 'status', status: 'thinking' }));

      // Build claude args
      // For existing sessions use --resume, for new ones use --session-id
      const isExisting = session.messages.length > 1; // more than just the user msg we just added
      const args = [
        '-p',
        '--verbose',
        '--output-format', 'stream-json',
        '--include-partial-messages',
        '--dangerously-skip-permissions',
      ];

      if (isExisting) {
        args.push('--resume', sessionId);
      } else {
        args.push('--session-id', sessionId);
      }

      args.push(userMessage);

      activeProc = spawn('claude', args, { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });

      let fullResponse = '';
      let buffer = '';
      let lastSentText = '';
      let claudeConversationId = null;

      activeProc.stdout.on('data', (chunk) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete last line

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);

            // Capture Claude's session/conversation ID
            if (event.session_id && !claudeConversationId) {
              claudeConversationId = event.session_id;
            }

            // Streaming text delta (--verbose wraps these in stream_event)
            const delta = event.type === 'stream_event' ? event.event : event;
            if (delta.type === 'content_block_delta' && delta.delta?.type === 'text_delta') {
              const token = delta.delta.text;
              fullResponse += token;
              if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({ type: 'token', text: token }));
              }
            }

            // Final result
            if (event.type === 'result' && event.result) {
              fullResponse = event.result;
              if (event.session_id) claudeConversationId = event.session_id;
            }

          } catch { /* non-JSON line, skip */ }
        }
      });

      activeProc.stderr.on('data', (chunk) => {
        console.error('[claude stderr]', chunk.toString().trim());
      });

      activeProc.on('close', (code) => {
        activeProc = null;

        // Save assistant response
        if (fullResponse) {
          session.messages.push({
            role: 'assistant',
            content: fullResponse,
            timestamp: new Date().toISOString()
          });
          session.updatedAt = new Date().toISOString();
          if (claudeConversationId) session.claudeConversationId = claudeConversationId;
          fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));
        }

        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ type: 'done', sessionId }));
          ws.send(JSON.stringify({ type: 'status', status: 'idle' }));
        }
      });

      activeProc.on('error', (err) => {
        console.error('[claude spawn error]', err);
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ type: 'error', message: err.message }));
          ws.send(JSON.stringify({ type: 'status', status: 'idle' }));
        }
      });
    }

    if (msg.type === 'abort' && activeProc) {
      activeProc.kill();
      activeProc = null;
    }
  });

  ws.on('close', () => {
    if (activeProc) {
      activeProc.kill();
      activeProc = null;
    }
  });
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
  console.log(`Chat UI: http://localhost:${PORT}/chat`);
});
