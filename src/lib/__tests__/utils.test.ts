import { cn } from '@/lib/utils';

describe('Utils - Classname merge utility', () => {
  it('should handles conflicts properly', () => {
    expect(cn('bg-grey-5 bg-hotpink')).toBe('bg-hotpink');
    expect(cn('hover:bg-grey-5 hover:bg-hotpink')).toBe('hover:bg-hotpink');
  });
});
