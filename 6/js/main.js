import {renderPosts} from './render-posts.js';
import { setPreviewPictureLoader } from './render-posts.js';
import { getData} from './data.js';
import { installForm} from './form.js';
import { showMessage} from './util.js';
import {removeDebounce,showFilters} from './filters.js';
installForm();
setPreviewPictureLoader();
try {
  const data = await getData();
  showFilters();
  removeDebounce(data);
  renderPosts(data);
} catch (err) {
  showMessage(err.message);
}
