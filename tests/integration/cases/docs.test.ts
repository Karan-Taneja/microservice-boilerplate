import supertest, { Response, SuperTest, Test } from 'supertest';
import nconf from 'nconf';

describe('docs', (): void => {
  const server: SuperTest<Test> = supertest(nconf.get('APP_URL'));

  it('should return the docs web page', async (): Promise<void> => {
    const response: Response = await server.get('/docs');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
  });
});
