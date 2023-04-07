import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dtos/channel.dto';
import { expect, jest, describe, beforeEach, beforeAll, it } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import { ChannelsModule } from './channels.module';
import { ChannelUser } from './models/user.model';
import { PrismaService } from '../../prisma/prisma.service';

const fakeSocket = {
  emit: jest.fn(),
  join: jest.fn(),
  leave: jest.fn(),
};

const user1 = new ChannelUser(1, 'user1', fakeSocket);
const user2 = new ChannelUser(2, 'user2', fakeSocket);
const user3 = new ChannelUser(3, 'user3', fakeSocket);

const publicChannelData: CreateChannelDto = {
  title: 'public',
  isPrivate: false,
  password: null,
};

const protectedChannelData: CreateChannelDto = {
  title: 'protected',
  isPrivate: false,
  password: 'password',
};

const privateChannelData: CreateChannelDto = {
  title: 'private',
  isPrivate: true,
  password: null,
};

it('create channel', async () => {
  let service: ChannelsService;

  const module: TestingModule = await Test.createTestingModule({
    providers: [ChannelsService, PrismaService],
  }).compile();

  service = module.get<ChannelsService>(ChannelsService);

  service.userModel.setUser(user1.id, user1);
  await service.createChannel(1, publicChannelData);
});

it('join channel', async () => {
  let service: ChannelsService;

  const module: TestingModule = await Test.createTestingModule({
    providers: [ChannelsService, PrismaService],
  }).compile();

  service = module.get<ChannelsService>(ChannelsService);

  service.userModel.setUser(user1.id, user1);
  service.userModel.setUser(user2.id, user2);
  const channelid = await service.createChannel(1, publicChannelData);
  await service.join(user2.id, channelid.id);
});

it('leave channel', async () => {
  let service: ChannelsService;

  const module: TestingModule = await Test.createTestingModule({
    providers: [ChannelsService, PrismaService],
  }).compile();

  service = module.get<ChannelsService>(ChannelsService);

  try {
    service.userModel.setUser(user1.id, user1);
    service.userModel.setUser(user2.id, user2);
    const channelid = await service.createChannel(1, publicChannelData);
    await service.join(user2.id, channelid.id);
    await service.leave(user2.id, channelid.id);
    
  } catch (error) {
    console.log(error);
  }
});

it('rejoin channel', async () => {
  let service: ChannelsService;

  const module: TestingModule = await Test.createTestingModule({
    providers: [ChannelsService, PrismaService],
  }).compile();

  service = module.get<ChannelsService>(ChannelsService);

  try {
    service.userModel.setUser(user1.id, user1);
    service.userModel.setUser(user2.id, user2);
    const channelid = await service.createChannel(1, publicChannelData);
    await service.join(user2.id, channelid.id);
    await service.leave(user2.id, channelid.id);
    await service.join(user2.id, channelid.id);
    
  } catch (error) {
    console.log(error);
  }
});


describe('Channel list', () => {
  let service: ChannelsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsService, PrismaService],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);

    service.userModel.setUser(user1.id, user1);
    service.userModel.setUser(user2.id, user2);
    service.userModel.setUser(user3.id, user3);

    await service.createChannel(1, publicChannelData);
    await service.createChannel(1, protectedChannelData);
    await service.createChannel(1, privateChannelData);
    await service.createChannel(2, publicChannelData);
    await service.createChannel(2, protectedChannelData);
    await service.initDirectMessage(1, 2);
  });

  it('/channels \n\t: 모든 public, protected 채널', () => {
    const query = {
      isEnter: false,
      isPublic: true,
      isPriv: false,
      isDm: false,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    console.log(channelList);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?kind=public \n\t: 모든 public, protected 채널', () => {
    const query = {
      isEnter: false,
      isPublic: true,
      isPriv: false,
      isDm: false,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?kind=public,private \n\t: 모든 public, protected, private 채널', () => {
    const query = {
      isEnter: false,
      isPublic: true,
      isPriv: true,
      isDm: false,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?kind=public,private,dm \n\t: 모든 public, protected, private, dm 채널', () => {
    const query = {
      isEnter: false,
      isPublic: true,
      isPriv: true,
      isDm: true,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?enter \n\t: 참여 중인 public, protected 채널', () => {
    const query = {
      isEnter: true,
      isPublic: true,
      isPriv: false,
      isDm: false,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?enter?kind=public \n\t: 참여 중인 public, protected 채널', () => {
    const query = {
      isEnter: true,
      isPublic: true,
      isPriv: false,
      isDm: false,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?enter?kind=public,private \n\t: 참여 중인 public, protected, private 채널', () => {
    const query = {
      isEnter: true,
      isPublic: true,
      isPriv: true,
      isDm: false,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?enter?kind=public,private,dm \n\t: 참여 중인 public, protected, private, dm 채널', () => {
    const query = {
      isEnter: true,
      isPublic: true,
      isPriv: true,
      isDm: true,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(1, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels \n\t: 어떠한 채널에도 들어가지 않은 유저', () => {
    const query = {
      isEnter: false,
      isPublic: false,
      isPriv: false,
      isDm: false,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(3, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });

  it('/channels?enter \n\t: 어떠한 채널에도 들어가지 않은 유저', () => {
    const query = {
      isEnter: true,
    };
    let cntPublic = 0;
    let cntProtected = 0;
    let cntPrivate = 0;
    let cntDm = 0;

    const channelList = service.list(3, query);
    channelList.forEach((v) => {
      if (v.title == 'public') {
        ++cntPublic;
      }
      if (v.title == 'protected') {
        ++cntProtected;
      }
      if (v.title == 'private') {
        ++cntPrivate;
      }
      if (v.isDm) {
        ++cntDm;
      }
    });

    console.log('cntPublic', cntPublic);
    console.log('cntProtected', cntProtected);
    console.log('cntPrivate', cntPrivate);
    console.log('cntDm', cntDm);
  });
});

describe('Channel info', () => {
  let service: ChannelsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsService, PrismaService],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);

    service.userModel.setUser(user1.id, user1);
    service.userModel.setUser(user2.id, user2);
    service.userModel.setUser(user3.id, user3);

    try {
      await service.createChannel(user1.id, publicChannelData);
      await service.createChannel(user1.id, protectedChannelData);
      await service.createChannel(user1.id, privateChannelData);
      await service.createChannel(user2.id, publicChannelData);
      await service.createChannel(user2.id, protectedChannelData);
      await service.createChannel(user2.id, privateChannelData);
      await service.initDirectMessage(user1.id, user2.id);
    } catch (error) {
      console.log(error);
    }
  });

  it('유저 참여 중, public 채널 정보를 확인하는 경우', () => {
    const channelId = 1;
    const userId = 1;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(channelId);
    } catch (error) {
      expect(error).toBe(false);
    }
  });

  it('유저 참여 중, protected 채널 정보를 확인하는 경우', () => {
    const channelId = 2;
    const userId = 1;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(channelId);
    } catch (error) {
      expect(error).toBe(false);
    }
  });

  it('유저 참여 중, private 채널 정보를 확인하는 경우', () => {
    const channelId = 3;
    const userId = 1;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(channelId);
    } catch (error) {
      expect(error).toBe(false);
    }
  });

  it('유저 미참여, public 채널 정보를 확인하는 경우', () => {
    const channelId = 4;
    const userId = 1;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(channelId);
    } catch (error) {
      expect(error).toBe(false);
    }
  });

  it('유저 미참여, protected 채널 정보를 확인하는 경우', () => {
    const channelId = 5;
    const userId = 1;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(false);
    } catch (error) {
      expect(error.code).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('유저 미참여, private 채널 정보를 확인하는 경우', () => {
    const channelId = 6;
    const userId = 1;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(false);
    } catch (error) {
      expect(error.code).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('유저 참여 중, dm 채널 정보를 확인하는 경우', () => {
    const channelId = 7;
    const userId = 1;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(channelId);
    } catch (error) {
      expect(error).toBe(false);
    }
  });

  it('유저 미참여, dm 채널 정보를 확인하는 경우', () => {
    const channelId = 7;
    const userId = 3;

    try {
      const channelInfo = service.getChannelInfo(userId, channelId);
      expect(channelInfo.id).toBe(false);
    } catch (error) {
      expect(error.code).toBe(HttpStatus.FORBIDDEN);
    }
  });
});
