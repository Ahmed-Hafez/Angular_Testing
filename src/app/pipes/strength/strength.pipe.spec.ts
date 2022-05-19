import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;

  beforeAll(() => {
    pipe = new StrengthPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('express weak value when passing value less than 10', () => {
    let value = 5;
    let message = pipe.transform(value);
    expect(message).toEqual(`${value} (weak)`);
  })

  it('express strong value when passing value greater than or equal 10', () => {
    let value = 10;
    let message = pipe.transform(value);
    expect(message).toEqual(`${value} (strong)`);
    value = 15;
    message = pipe.transform(value);
    expect(message).toEqual(`${value} (strong)`);
  })
});
