import { injectStyles } from './styles';
import { injectButtons } from './buttons';

const store = {
  enabled: false,
  contentTypeMap: {},
};

const inlineMode = () => {
  store.enabled = true;
  injectStyles();
  injectButtons(store.contentTypeMap);
};

const onHotKey = ev => {
  const { key, ctrlKey } = ev;
  if (key === 'i' && ctrlKey) {
    if (store.enabled) {
      location.search = location.search
        .replace('?inline', '')
        .replace('inline', '');
    }

    inlineMode();
  }
};

window.inlineMode = inlineMode;
document.addEventListener('keypress', onHotKey);

const highlightContent = ({ contentTypeMap }) => {
  store.contentTypeMap = contentTypeMap;
  const isInlineMode = location.search.includes('inline');
  if (!isInlineMode) return;
  inlineMode();
};

export default highlightContent;
