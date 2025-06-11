import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('Team E2E Tests', () => {
  let app: INestApplication;
  let studentToken: string; // Assuming token-based auth for /team

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // TODO: Implement actual login to get a student token
    // For now, using a placeholder. This will likely cause the test to fail
    // if authentication is strictly enforced and this token is invalid.
    // The actual test run will reveal if a real login is needed here.
    const loginResponse = await request(app.getHttpServer())
      .post('/organ/login') // Assuming an endpoint like this exists
      .send({ userId: 'teststudent', password: 'password' }); // Replace with actual test credentials

    if (loginResponse.body && loginResponse.body.accessToken) {
        studentToken = loginResponse.body.accessToken;
    } else {
        // Fallback or handle error if login fails - for now, let's try with a dummy
        console.warn('Login failed or token not found, using placeholder token for /team test');
        studentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDAwMDAwMDAwfQ.dummyTokenPlaceholder';
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /team - should return team details including maxInvDeg', async () => {
    // This assumes that the student identified by the token is part of a team.
    // And that team is part of a class which has a maxInvDeg.
    const response = await request(app.getHttpServer())
      .get('/team')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined(); // Check for some existing fields
    // Add the check for maxInvDeg
    expect(response.body.maxInvDeg).toBeDefined();
    expect(typeof response.body.maxInvDeg).toBe('number');
  });
});
