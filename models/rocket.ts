import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import { PayloadWeight } from './payloadWeight';

type OmitTypes = 'payloadWeights';

class Rocket extends Model<
  InferAttributes<
    Rocket,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Rocket,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare name?: string | null;
  declare description?: string | null;
  declare company?: string | null;
  declare costPerLaunch?: number | null;
  declare stages?: number | null;
  declare boosters?: number | null;
  declare wikipedia?: string | null;
  declare payloadWeights?: NonAttribute<PayloadWeight[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Rocket.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        company: { type: DataTypes.STRING, allowNull: true },
        costPerLaunch: { type: DataTypes.INTEGER, allowNull: true },
        stages: { type: DataTypes.INTEGER, allowNull: true },
        boosters: { type: DataTypes.INTEGER, allowNull: true },
        wikipedia: { type: DataTypes.STRING, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Rocket;
  }
  public static associate = ({ PayloadWeight }) => {
    Rocket.hasMany(PayloadWeight, { foreignKey: 'rocketId', as: 'payloadWeights' });
  };
}

export { Rocket, Rocket as RocketAttributes };
