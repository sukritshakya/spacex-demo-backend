import { PaginationInput } from '../common/types/backend';
import { AuthScope } from '../config';
import { db } from '../models';
import { RocketAttributes } from '../models/rocket';

const get = async ({ pagination }: { pagination: PaginationInput }, authScope: AuthScope): Promise<RocketAttributes[]> => {
  const rockets = await db.Rocket.findAll({
    include: [{ model: db.PayloadWeight, as: 'payloadWeights' }]
  });

  return rockets;
};

const rocketController = {
  get,
};
export { rocketController };
