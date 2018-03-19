const { DataTypes } = require('sequelize');

module.exports = seq =>
  seq.define(
    'orderMeta',
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'idx',
      },
      userId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'user_idx',
      },
      addressId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'address_idx',
      },
      mobile: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'mobile',
      },

      totalPrice: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'total_price',
      },
      // 어느 순간부터 TimeSlot의 Id를 받기시작했다.
      timeSlotId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'time_slot',
      },
      couponId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'coupon_idx',
      },
      // creditUsed: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: true,
      //   field: 'credit_used',
      // },
      pointUsed: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'point_used',
      },
      payMethod: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: 'pay_method',
      },
      purchased: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'purchased',
      },
      includeCutlery: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
        field: 'include_cutlery',
      },
      review: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: 'review',
      },
      requestTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: seq.literal('CURRENT_TIMESTAMP'),
        field: 'request_time',
      },
      serviceType: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: 'DINNER',
        field: 'service_type',
      },
      deliveryFee: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: '0',
        field: 'delivery_fee',
      },
      recipientName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: '',
        field: 'recipient_name',
      },
      entrancePassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        field: 'entrance_password',
      },
      deliveryMemo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        field: 'delivery_memo',
      },
      captainId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        field: 'captain_idx',
      },
      captainMemo: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'captain_memo',
      },
      deliveryType: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: 'default',
        field: 'delivery_type',
      },
      orderType: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: 'default',
        field: 'order_type',
      },
      serveAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'serve_at',
      },
      deliveryAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'delivery_at',
      },
      deliveryDispatchUpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'delivery_dispatch_updated_at',
      },
    },
    {
      tableName: 'order_meta',
      timestamps: false,
    }
  );
