import { useContext, useState } from "react";
import Button from "../components/Button/Button";
import CustomForm from "../components/Form/CustomForm";
import InputField from "../components/Form/Field/InputField";
import * as yup from "yup";
import { BarLoader } from "react-spinners";
import { Store } from "../Store/Store";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { dispatch: ctxDispatch } = useContext(Store);
  const fields = {
    name: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  };
  const onSubmit = (values) => {
    setLoading(true);
    if (!values.name) return false;
    ctxDispatch({ type: "SAVE_ADDRESS", payload: values });
    setLoading(false);
    navigate("/checkout?step=payment");
  };
  const validation = yup.object({
    name: yup
      .string()
      .min(3, "Name must be getter than 3 ")
      .required("Name is required!"),
    address: yup.string().min(3).required("Address is required!"),
    city: yup.string().min(3).required("City is required!"),
    postal: yup.number().min(3).required("Postal code is required!"),
    country: yup.string().min(2).required("Country is required!"),
  });
  return (
    <div className="md:w-1/2 sm:w-full mx-auto bg-white md:my-28 p-5 rounded-lg">
      <h2 className="text-4xl mb-5 font-bold uppercase">
        Shipping <span className="text-yellow-500">Address 🏠</span>
      </h2>
      <CustomForm fields={fields} onSubmit={onSubmit} validation={validation}>
        {/* Name */}
        <InputField type="text" placeholder="Jhon Doe" name="name">
          <label className="text-2xl font-normal" htmlFor="name">
            Your Name <span className="text-red-500 font-bold">*</span>
          </label>
        </InputField>
        {/* Address */}
        <InputField type="text" placeholder="1911, 65 Rue..." name="address">
          <label className="text-2xl font-normal" htmlFor="address">
            Address <span className="text-red-500 font-bold">*</span>
          </label>
        </InputField>
        {/* City */}
        <InputField type="text" placeholder="Montreal" name="city">
          <label className="text-2xl font-normal" htmlFor="city">
            City <span className="text-red-500 font-bold">*</span>
          </label>
        </InputField>
        {/* Postal Code */}
        <InputField type="text" placeholder="H2X1C4" name="postal">
          <label className="text-2xl font-normal" htmlFor="postal">
            Postal Code <span className="text-red-500 font-bold">*</span>
          </label>
        </InputField>
        {/* Country */}
        <InputField type="text" placeholder="Bangladesh" name="country">
          <label className="text-2xl font-normal" htmlFor="country">
            Country <span className="text-red-500 font-bold">*</span>
          </label>
        </InputField>
        <Button text="Submit" className="text-2xl">
          <BarLoader
            color="#000"
            loading={loading}
            id="spinner"
            cssOverride={{
              marginRight: 10,
            }}
            margin={5}
            size={10}
            disabled={loading}
          />
        </Button>
      </CustomForm>
    </div>
  );
};

export default Shipping;
