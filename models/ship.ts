import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import { Mission } from './mission';

type OmitTypes = 'missions';

class Ship extends Model<
  InferAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare class?: string | null;
  declare name?: string | null;
  declare image?: string | null;
  declare active: boolean;
  declare missions?: NonAttribute<Mission[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Ship.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        class: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Ship;
  }
  public static associate = ({ Mission }) => {
    Ship.hasMany(Mission, { foreignKey: 'shipId', as: 'missions' });
  };
}

export { Ship, Ship as ShipAttributes };
