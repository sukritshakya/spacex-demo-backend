import { QueryRocketsArgs } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { rocketController } from '../../../controllers';
import { RocketAttributes } from '../../../models/rocket';

const rockets = async (rootValue, { input }: QueryRocketsArgs, context: GraphqlContext): Promise<RocketAttributes[]> => {
  return rocketController.get(input, context);
};

const query = { rockets };

const mutation = {};

const Rocket = { query, mutation };
export { Rocket };
