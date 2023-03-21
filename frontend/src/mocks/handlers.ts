import { rest } from 'msw';
import { API_PREFIX } from 'api/api.v1';
import { UserType } from 'types/userType';

const mockBlocks: UserType[] = [
  {
    id: 1,
    nickname: 'Mock Block Nickname1',
  },
  {
    id: 2,
    nickname: 'Mock Block Nickname2',
  },
  {
    id: 3,
    nickname: 'Mock Block Nickname3',
  },
  {
    id: 4,
    nickname: 'Mock Block Nickname4',
  },
];

export const handlers = [
  rest.get(`${API_PREFIX}/health-check`, (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'mock',
      })
    );
  }),

  rest.get('/api/v1/users/:userId', (req, res, ctx) => {
    const userId = Number(req.params.userId);
    return res(
      ctx.json({
        id: userId,
        nickname: `user${userId}'s nickname`,
        rank: 0,
        achievements: [],
        games: [],
      })
    );
  }),

  rest.get(`${API_PREFIX}/my/blocks`, (req, res, ctx) => {
    return res(ctx.json(mockBlocks));
  }),

  rest.delete(`${API_PREFIX}/my/blocks/:userId`, (req, res, ctx) => {
    const userId = Number(req.params.userId);
    const index = mockBlocks.findIndex((user) => user.id === userId);
    if (index === -1) {
      return res(ctx.status(404));
    }
    mockBlocks.splice(index, 1);
    return res(ctx.status(204));
  }),

  rest.put(`${API_PREFIX}/my/blocks/:userId`, (req, res, ctx) => {
    const userId = Number(req.params.userId);
    const index = mockBlocks.findIndex((user) => user.id === userId);
    if (index == -1) {
      mockBlocks.push({
        id: userId,
        nickname: `Mock Block Nickname${userId}`,
      });
    }
    return res(ctx.status(204));
  }),
];
