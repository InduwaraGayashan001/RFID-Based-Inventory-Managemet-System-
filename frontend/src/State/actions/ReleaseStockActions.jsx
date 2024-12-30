import axios from 'axios';
import { fetchStockStart, fetchStockSuccess, fetchStockFailure } from '../reducers/ReleaseStockReducer';

const API_RELEASE_URL = 'http://localhost:8080/api/releases';
const API_LAST_ITEM_URL = 'http://localhost:8080/api/releases/last';

export const fetchLastStock = () => async (dispatch) => {
  dispatch(fetchStockStart());
  try {
    const response = await axios.get(API_LAST_ITEM_URL);
    const product = response.data;
    dispatch(fetchStockSuccess({
      transactionId: product.transactionId,
      rfId: product.rfid,
      releaseQuantity: product.releaseQuantity,
      releasePrice: product.releasePrice,
      time: new Date(product.timestamp).toISOString().replace('T', ' ').split('.')[0],
    }));
    console.log('Fetched releases:', product);
    if (product.releaseQuantity !== 0) {
        alert('Current scanned RFID related stock ' + product.stockId + ' already released. Redirecting to view Release Page. Scan new RFID again and try again.');
        window.location.href = '/view-release'; 
        return;
      };
  } catch (error) {
    dispatch(fetchStockFailure(error.message));
  }
};

export const releaseStock = (payload) => async (dispatch) => {
  try {
    await axios.put(`${API_RELEASE_URL}/${payload.transactionId}`, payload);
    alert('Stock released successfully!');
    window.location.href = '/view-release';
  } catch (error) {
    console.error('Error releasing stock:', error);
    alert('Failed to release stock. Check console for details.');
  }
};
