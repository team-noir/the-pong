import { rest } from 'msw';
import { API_PREFIX } from 'api/api.v1';

export const handlers = [
  rest.get(`${API_PREFIX}/health-check`, (_, res, ctx) => {
    return res(
      ctx.json({
        message: 'mock',
      })
    );
  }),

  rest.get(`${API_PREFIX}/my/2fa`, (_, res, ctx) => {
    return res(
      ctx.json({
        twoFactorData: 'mock',
      })
    );
  }),

  rest.delete(`${API_PREFIX}/my/2fa`, (_, res, ctx) => {
    return res(ctx.status(204));
  }),
];
