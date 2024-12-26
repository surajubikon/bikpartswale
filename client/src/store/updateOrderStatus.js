const updateOrderStatus = (orderId, status) => {
  return {
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status }
  };
};
