let body = $response.body;
let obj = JSON.parse(body);

if (obj.cart && obj.cart.id) {
    let cartId = obj.cart.id;
    
    $persistentStore.write(cartId, "cartId");

    $notification.post("Cart ID 获取成功", `cartId: ${cartId}`, "");
    
    console.log(`Cart ID: ${cartId}`);
} else {
    $notification.post("Cart ID 获取失败", "响应体中未找到 cart id", "");
    console.log("响应体中未找到 cart id");
}

$done({});
