import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication<App>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Auth', () => {
    it('POST /auth/login - success', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'password123' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          token = res.body.access_token;
        });
    });

    it('POST /auth/login - invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'wrong' })
        .expect(401);
    });
  });

  describe('Recharges', () => {
    it('POST /recharges/buy - success', () => {
      return request(app.getHttpServer())
        .post('/recharges/buy')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 5000, phoneNumber: '3123456789' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('success', true);
          expect(res.body).toHaveProperty('transactionId');
        });
    });

    it('POST /recharges/buy - unauthorized', () => {
      return request(app.getHttpServer())
        .post('/recharges/buy')
        .send({ amount: 5000, phoneNumber: '3123456789' })
        .expect(401);
    });

    it('POST /recharges/buy - validation error', () => {
      return request(app.getHttpServer())
        .post('/recharges/buy')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 500, phoneNumber: '1234567890' })
        .expect(400);
    });

    it('GET /recharges/history - success', () => {
      return request(app.getHttpServer())
        .get('/recharges/history')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('GET /recharges/history - unauthorized', () => {
      return request(app.getHttpServer())
        .get('/recharges/history')
        .expect(401);
    });
  });
});
