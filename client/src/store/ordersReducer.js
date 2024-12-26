const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ORDER_STATUS':
            return {
                ...state,
                order: state.order.map(order =>
                    order._id === action.payload.orderId
                        ? { ...order, status: action.payload.status }
                        : order
                )
            };
        // Other cases
        default:
            return state;
    }
};
