import { Hyperlink } from '../constants/fire-store.types';

export const OnOpenUrl = (link: Hyperlink, target: '_blank' | '_parent' | '_self' | '_top' | 'URL' | 'name' = '_blank') => {
  if (link?.linkUrl == null) {
    return;
  }

  window.open(link.linkUrl, target);
};
