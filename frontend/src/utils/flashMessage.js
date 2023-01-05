import { toast } from 'react-toastify';
const flashMessage = ({
  type = 'success',
  options = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  },
  text = 'Success',
}) => {
  return toast[type](text, options);
};

export default flashMessage;
