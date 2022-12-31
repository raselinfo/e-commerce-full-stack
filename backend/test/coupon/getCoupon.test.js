import getCouponService from '../../service/coupon/getCouponService';
import { describe, it, expect } from 'vitest';

describe('Coupon Test', () => {
  it('Get coupon', () => {
    const input = 'rasel360';
    const { result } = getCouponService(input);
    expect(result).toBe("rasel")
  });
});


