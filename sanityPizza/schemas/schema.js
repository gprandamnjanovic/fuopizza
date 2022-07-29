import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import pizza from './pizza';
import order from './order';
export default createSchema({
  name: 'default',

  types: schemaTypes.concat([pizza, order]),
});
