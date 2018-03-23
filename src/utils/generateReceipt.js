const PayMethod = require('../../const').PayMethod;
const OrderType = require('../../const').OrderType;
const DeliveryType = require('../../const').DeliveryType;
const moment = require('moment');

const formatPrice = function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const formatPriceWithWon = function formatPriceWithWon(price) {
  const formattedPrice = formatPrice(price);
  return `${formattedPrice}원`;
};

//영수증 format을 만들어준다.
const generateReceipt = function generateReceipt(orderData) {
  let clipboardContent = '';

  const { riderId, deliverySequenceNumber } = orderData;

  if (riderId && deliverySequenceNumber) {
    clipboardContent += `${riderId}-${deliverySequenceNumber}\n\n`;
  }

  if (orderData.orderType === OrderType.PLATING && orderData.includeCutlery === false) {
    clipboardContent += '커틀 X 커틀 X 커틀 X 커틀 X 커틀 X\n커틀은 넣지 않습니다\n\n';
  }

  let idText;
  switch (orderData.orderType) {
    case OrderType.PLATING:
      idText = orderData.id;
      break;
    case OrderType.FOODFLY:
      idText = '푸플';
      break;
    default:
      idText = '알수없는 주문타입';
      break;
  }
  idText += orderData.isFirstOrder === true ? '\n(신규)' : '\n(재)';

  const dong = orderData.simpleAddress.match(/(\S+)/g)[2];
  const deliveryTime = moment(orderData.deliveryTime, 'HH:mm:ss').format('hh:mm');

  clipboardContent += `${idText}-${dong}-${deliveryTime}\n`;

  let externalText;
  switch (orderData.deliveryType) {
    case DeliveryType.FOODFLY:
      externalText = '외부배차: 푸드플라이';
      break;
    case DeliveryType.VROONG:
      externalText = '외부배차: 부릉';
      break;
    case DeliveryType.BAROGO:
      externalText = '외부배차: 바로고';
      break;
    case DeliveryType.PLATING:
      externalText = '내부배차';
      break;
    default:
      externalText = '';
      break;
  }

  clipboardContent += `${externalText}\n\n`;

  orderData.menus.forEach(({ name, quantity }) => {
    if (name !== '배송리뷰') {
      clipboardContent += `${name} ${quantity}\n`;
    }
  });

  const paymentPrice = parseInt(orderData.totalPrice, 10);

  // 메뉴 총 가격을 써줘야 함
  let originalPrice = 0;
  if (orderData.orderType === OrderType.PLATING) {
    orderData.menus.forEach(({ price, quantity }) => {
      originalPrice += price * quantity;
    });
  } else {
    originalPrice = paymentPrice;
  }


  const paymentPriceText = formatPriceWithWon(paymentPrice);
  const originalPriceText = formatPriceWithWon(originalPrice);

  clipboardContent += '\n';

  if (paymentPrice === originalPrice) {
    clipboardContent += `결제 ${paymentPriceText}`;
  } else {
    clipboardContent += `총액 ${originalPriceText}\n결제 ${paymentPriceText}`;
  }

  if (!!orderData.payMethod) {
    clipboardContent += '\n';
    if (orderData.payMethod === PayMethod.ONLINE_CARD) {
      clipboardContent += '(결제 완료)';
    } else if (orderData.payMethod === PayMethod.OFFLINE_CARD) {
      clipboardContent += '(현장 카드)';
    } else if (orderData.payMethod === PayMethod.OFFLINE_CASH) {
      clipboardContent += '(현금)';
    } else {
      clipboardContent += `(${orderData.payMethod})`;
    }
  }

  return clipboardContent;
};

// module.exports.formatPrice = formatPrice;
// module.exports.formatPriceWithWon = formatPriceWithWon;
module.exports = generateReceipt;
