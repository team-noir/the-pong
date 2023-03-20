import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/health-check', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'mock',
      })
    );
  }),
];
