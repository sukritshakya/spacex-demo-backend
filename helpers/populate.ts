if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';

const populate = async () => {
  await cleanDb();
  console.log('Populating database...');

  const ships = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ ships { id name image class active } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

  await Promise.all(
    ships.map((ship: any) => {
      return db.Ship.create({
        active: ship.active,
        name: ship.name,
        class: ship.class,
        image: ship.image,
      });
    }),
  );

  const rockets = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ rockets { id name description company cost_per_launch stages boosters wikipedia payload_weights { id kg lb name} } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.rockets);

  await Promise.all(
    rockets.map(async (rocket: any) => {
      const newRocket = await db.Rocket.create({
        id: rocket.id,
        name: rocket.name,
        description: rocket.description,
        company: rocket.company,
        costPerLaunch: rocket.cost_per_launch,
        stages: rocket.stages,
        boosters: rocket.boosters,
        wikipedia: rocket.wikipedia
      });

      await Promise.all(
        rocket.payload_weights.map((payloadWeight: any) => {
          return db.PayloadWeight.create({
            stringId: payloadWeight.id,
            name: payloadWeight.name,
            kg: payloadWeight.kg,
            lb: payloadWeight.lb,
            rocketId: newRocket.id
          });
        }),
      );
    }),
  );

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
