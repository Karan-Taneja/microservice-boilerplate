import 'tests/mocks/services/health';
import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import HealthController from 'src/controllers/health';
import healthInfoMatch from 'tests/schemas/health';

describe('health controllers', (): void => {
  afterAll((): void => {
    jest.resetAllMocks();
  });

  it('should return the health information', async (): Promise<void> => {
    const healthController: HealthController = new HealthController();
    const ctx: Context = createMockContext();

    await healthController.getHealthInfo(ctx);

    expect(ctx.body).toMatchObject(healthInfoMatch);
  });
});
