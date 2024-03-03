import { User } from './user';
import { BlockApp } from './blockApp';
import { Ship } from './ship';
import { Rocket } from './rocket';

const resolvers = {
  Query: {
    ...User.query,
    ...BlockApp.query,
    ...Ship.query,
    ...Rocket.query,
  },
  Mutation: {
    ...User.mutation,
    ...BlockApp.mutation,
    ...Ship.mutation,
    ...Rocket.mutation,
  },
};

export { resolvers };
