import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/health-check', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'mock',
      })
    );
  }),

  rest.get('/api/v1/users/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.userId,
        nickname: `user${req.params.userId}'s nickname`,
        rank: 0,
        achievements: [],
        games: [],
      })
    );
  }),
];
