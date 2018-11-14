import { getInputType } from '../../../src/global/mixins';
import ModelType from '../../../src/global/constants/ModelType';

describe('getInputType.js', () => {
  it('gets the corresponding input type from a type constructor passed in', () => {
    expect(getInputType(Array)).toEqual('select');
    expect(getInputType(Boolean)).toEqual('checkbox');
    expect(getInputType(Number)).toEqual('number');
    expect(getInputType(Date)).toEqual('date');
    expect(getInputType(ModelType.Password)).toEqual('password');
    expect(getInputType(ModelType.PhoneNumber)).toEqual('phone');
    expect(getInputType(String)).toEqual('text');
    expect(getInputType(Object)).toEqual('text');
    expect(getInputType(undefined)).toEqual('text');
    expect(getInputType(null)).toEqual('text');
  });
});
