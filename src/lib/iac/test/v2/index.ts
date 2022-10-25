import { TestConfig } from './types';
import { scan, scanV2 } from './scan';
import { TestOutput } from './scan/results';
import { initLocalCache } from './local-cache';
import { addIacAnalytics } from './analytics';

export { TestConfig } from './types';

export async function test(testConfig: TestConfig): Promise<TestOutput> {
  const { policyEnginePath, rulesBundlePath } = await initLocalCache(
    testConfig,
  );

  const testOutput = await scan(testConfig, policyEnginePath, rulesBundlePath);

  addIacAnalytics(testConfig, testOutput);

  return testOutput;
}

export async function testV2(testConfig: TestConfig): Promise<number> {
  const { policyEnginePath, rulesBundlePath } = await initLocalCache(
    testConfig,
  );

  return await scanV2(testConfig, policyEnginePath, rulesBundlePath);
}
