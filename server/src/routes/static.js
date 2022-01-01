import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'serve-static';

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

function setCustomeHeaders (res) {
  res.setHeader('Content-Encoding','gzip')
  res.setHeader('cache-control', 'max-age=604800, must-revalidate')
}

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
  serveStatic(UPLOAD_PATH, {
    etag: true,
    lastModified: true,
    setHeaders:setCustomeHeaders
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    etag: true,
    lastModified: true,
    setHeaders:setCustomeHeaders
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    etag: true,
    lastModified: true,
    setHeaders:setCustomeHeaders
  }),
);

export { router as staticRouter };
