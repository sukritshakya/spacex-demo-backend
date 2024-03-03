import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute } from 'sequelize';
import { Rocket } from './rocket';

type OmitTypes = 'rocket';

class PayloadWeight extends Model<
  InferAttributes<
    PayloadWeight,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    PayloadWeight,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare stringId?: string | null;
  declare name?: string | null;
  declare kg?: string | null;
  declare lb?: string | null;
  declare rocketId?: ForeignKey<Rocket['id']>;
  declare rocket?: NonAttribute<Rocket>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    PayloadWeight.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        stringId: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        kg: { type: DataTypes.INTEGER, allowNull: true },
        lb: { type: DataTypes.INTEGER, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return PayloadWeight;
  }
  public static associate = ({ Rocket }) => {
    PayloadWeight.belongsTo(Rocket, { foreignKey: 'rocketId', as: 'rocket' });
  };
}

export { PayloadWeight, PayloadWeight as PayloadWeightAttributes };
