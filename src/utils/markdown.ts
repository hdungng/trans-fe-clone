// helper: lấy tên file từ URL hoặc từ text/title
export const getFileNameFromUrl = (href: string, fallback?: string) => {
  try {
    const u = new URL(href);
    const last = u.pathname.split('/').filter(Boolean).pop();
    return decodeURIComponent(last || fallback || 'download');
  } catch {
    // href có thể là relative/path
    const parts = href.split('?')[0].split('#')[0].split('/');
    const last = parts.filter(Boolean).pop();
    return decodeURIComponent(last || fallback || 'download');
  }
};

// helper: nhận diện link là file xem trước được
export const isFileLink = (href: string) => {
  const exts = [
    'pdf', 'csv', 'txt',
    'png', 'jpg', 'jpeg', 'webp',
    'xls', 'xlsx', 'xlsm',
    'doc', 'docx',
    'zip', 'rar'
  ];
  const clean = href.split('?')[0].split('#')[0].toLowerCase();
  const ext = clean.split('.').pop() || '';
  return exts.includes(ext);
};
