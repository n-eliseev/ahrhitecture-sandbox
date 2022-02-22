import { Connect } from '../../services/Store';
import FormPage from './FormPage';

export default Connect(
	FormPage, 
	state => state.form ?? {} 
);
