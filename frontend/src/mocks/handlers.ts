import { rest } from 'msw';
import { API_PREFIX } from 'api/api.v1';

export const handlers = [
  rest.get(`${API_PREFIX}/my/2fa`, (_, res, ctx) => {
    return res(
      ctx.json({
        qr: `${process.env.PUBLIC_URL}/images/default-profile-image.png`,
        key: 'abcd123',
      })
    );
  }),

  rest.post(`${API_PREFIX}/my/2fa`, (_, res, ctx) => {
    return res(ctx.status(202));
  }),

  rest.delete(`${API_PREFIX}/my/2fa`, (_, res, ctx) => {
    return res(ctx.status(204));
  }),
];
