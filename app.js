const conversations = [
  {
    id: 'c1',
    title: 'Weekly planning',
    messages: [
      { role: 'user', text: 'Can you summarize my tasks for this week?' },
      { role: 'assistant', text: 'You have 3 priorities: finish UI, write tests, and update docs.' },
      { role: 'user', text: 'Please draft a short status update too.' }
    ]
  },
  {
    id: 'c2',
    title: 'Release prep',
    messages: [
      { role: 'assistant', text: 'Reminder: freeze starts Friday at 5 PM.' },
      { role: 'user', text: 'Got it, I will merge frontend changes before then.' }
    ]
  },
  {
    id: 'c3',
    title: 'API troubleshooting',
    messages: [
      { role: 'user', text: 'Why am I seeing 401 responses in staging?' },
      { role: 'assistant', text: 'The token is expired. Refresh credentials in your environment config.' }
    ]
  }
];

let activeConversationId = conversations[0].id;

const listEl = document.getElementById('conversation-list');
const viewerEl = document.getElementById('chat-viewer');
const searchEl = document.getElementById('search-bar');

const makePreview = (messages) => messages[messages.length - 1]?.text ?? '';

function filterConversations(term) {
  if (!term) return conversations;

  const lowered = term.toLowerCase();
  return conversations.filter((conversation) => {
    if (conversation.title.toLowerCase().includes(lowered)) return true;
    return conversation.messages.some((message) => message.text.toLowerCase().includes(lowered));
  });
}

function renderConversationList(items) {
  listEl.innerHTML = '';

  if (!items.length) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No matching conversations found.';
    listEl.appendChild(empty);
    viewerEl.innerHTML = '<p class="empty-state">Try a different search term.</p>';
    return;
  }

  if (!items.some((item) => item.id === activeConversationId)) {
    activeConversationId = items[0].id;
  }

  for (const conversation of items) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `conversation-item${conversation.id === activeConversationId ? ' active' : ''}`;

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = conversation.title;

    const preview = document.createElement('span');
    preview.className = 'preview';
    preview.textContent = makePreview(conversation.messages);

    button.append(title, preview);

    button.addEventListener('click', () => {
      activeConversationId = conversation.id;
      render();
    });

    li.appendChild(button);
    listEl.appendChild(li);
  }

  renderMessages(items.find((item) => item.id === activeConversationId));
}

function renderMessages(conversation) {
  viewerEl.innerHTML = '';

  if (!conversation) {
    viewerEl.innerHTML = '<p class="empty-state">Select a conversation to view messages.</p>';
    return;
  }

  for (const message of conversation.messages) {
    const node = document.createElement('article');
    node.className = `message ${message.role}`;

    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = message.role === 'user' ? 'You' : 'Assistant';

    const body = document.createElement('div');
    body.textContent = message.text;

    node.append(meta, body);
    viewerEl.appendChild(node);
  }
}

function render() {
  renderConversationList(filterConversations(searchEl.value.trim()));
}

searchEl.addEventListener('input', render);
render();
