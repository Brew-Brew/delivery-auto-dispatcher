# Delivery-auto-dispatcher

## 자동배차를 위한 third party cron api 서버를 제작해보자.

```javascript
중요기능 부분

# src/jobs/autoDispatcher

//1. 접수관련 빅보스에서 따왔음
function requestVroongOrder(orderIdx) {
    let status = 400;
    return fetch(`https://gatewaylab.plating.co.kr/vroong/order/${orderIdx}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      status = response.status;
      return response.json();
    });
  }

//2. 빌지 출력과 deliverytype 변경관련 배차고에서 따옴
  async function changeDeliveryWithPrint(orderId) {
    return new Promise(async function(resolve, reject) {
      //generateReceipt 부분을 배차고에서 가져온다.
      const order = await getOrder(orderId);
      //영수증 포맷 생성
      const receipt = generateReceipt(order);

      let status = 400;
        fetch(`https://store.plating.co.kr/vroong/order/${orderId}`, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            console.log(res);
            status = res.status;
            return res.json();
          })
          .then((json) => {
            console.log(json);
            if (status >= 400) {
              return reject(json);
            } else {
              socket.emit('onDeliveryTypeSettingButtonPressed', {
                orderId,
                deliveryType: 'vroong',
                receipt,
              });
              return resolve(json.message);
            }
          })
          .catch((json) => {
            console.log(json);
          });
    });
}
```
