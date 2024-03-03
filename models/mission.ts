import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute } from 'sequelize';
import { Ship } from './ship';

type OmitTypes = 'ship';

class Mission extends Model<
  InferAttributes<
    Mission,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Mission,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare name?: string | null;
  declare description?: string | null;
  declare shipId?: ForeignKey<Ship['id']>;
  declare ship?: NonAttribute<Ship>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Mission.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Mission;
  }
  public static associate = ({ Ship }) => {
    Mission.belongsTo(Ship, { foreignKey: 'shipId', as: 'ship' });
  };
}

export { Mission, Mission as MissionAttributes };
