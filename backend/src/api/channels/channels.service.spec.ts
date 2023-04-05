import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService, ChannelUser } from './channels.service';
import { CreateChannelDto } from './dtos/channel.dto';
import { expect, jest, describe, beforeEach, beforeAll, it } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import { ChannelsModule } from './channels.module';

const fakeSocket = {
  emit: jest.fn(),
  join: jest.fn(),
};

const user1: ChannelUser = {
  id: 1,
  name: 'user1',
  socket: fakeSocket,
  joined: new Set(),
  invited: new Set(),
  blockUser: new Set(),
};

const user2: ChannelUser = {
  id: 2,
  name: 'user2',
  socket: fakeSocket,
  joined: new Set(),
  invited: new Set(),
  blockUser: new Set(),
};

const user3: ChannelUser = {
  id: 3,
  name: 'user3',
  socket: fakeSocket,
  joined: new Set(),
  invited: new Set(),
  blockUser: new Set(),
};

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

describe('Channel list', () => {
  let service: ChannelsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsService],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);

    service.setUser(user1.id, user1);
    service.setUser(user2.id, user2);
    service.setUser(user3.id, user3);

    service.create(1, publicChannelData);
    service.create(1, protectedChannelData);
    service.create(1, privateChannelData);

    service.create(2, publicChannelData);
    service.create(2, protectedChannelData);

    service.initDirectMessage(1, 2);
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

    expect(cntPublic).toBe(2);
    expect(cntProtected).toBe(2);
    expect(cntPrivate).toBe(0);
    expect(cntDm).toBe(0);
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

    expect(cntPublic).toBe(2);
    expect(cntProtected).toBe(2);
    expect(cntPrivate).toBe(0);
    expect(cntDm).toBe(0);
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

    expect(cntPublic).toBe(2);
    expect(cntProtected).toBe(2);
    expect(cntPrivate).toBe(1);
    expect(cntDm).toBe(0);
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

    expect(cntPublic).toBe(2);
    expect(cntProtected).toBe(2);
    expect(cntPrivate).toBe(1);
    expect(cntDm).toBe(1);
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

    expect(cntPublic).toBe(1);
    expect(cntProtected).toBe(1);
    expect(cntPrivate).toBe(0);
    expect(cntDm).toBe(0);
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

    expect(cntPublic).toBe(1);
    expect(cntProtected).toBe(1);
    expect(cntPrivate).toBe(0);
    expect(cntDm).toBe(0);
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

    expect(cntPublic).toBe(1);
    expect(cntProtected).toBe(1);
    expect(cntPrivate).toBe(1);
    expect(cntDm).toBe(0);
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

    expect(cntPublic).toBe(1);
    expect(cntProtected).toBe(1);
    expect(cntPrivate).toBe(1);
    expect(cntDm).toBe(1);
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

    expect(cntPublic).toBe(2);
    expect(cntProtected).toBe(2);
    expect(cntPrivate).toBe(0);
    expect(cntDm).toBe(0);
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

    expect(cntPublic).toBe(0);
    expect(cntProtected).toBe(0);
    expect(cntPrivate).toBe(0);
    expect(cntDm).toBe(0);
  });
});

describe('Channel info', () => {
  let service: ChannelsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsService],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);

    service.setUser(user1.id, user1);
    service.setUser(user2.id, user2);
    service.setUser(user3.id, user3);

    service.create(user1.id, publicChannelData);
    service.create(user1.id, protectedChannelData);
    service.create(user1.id, privateChannelData);

    service.create(user2.id, publicChannelData);
    service.create(user2.id, protectedChannelData);
    service.create(user2.id, privateChannelData);

    service.initDirectMessage(user1.id, user2.id);
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
