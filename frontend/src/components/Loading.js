import { HashLoader } from "react-spinners";
let override = {
  display: "block",
  margin: "50px auto",
  borderColor: "red",
};
const Loading = ({loading}) => {
  return (
    <div>
      <HashLoader
        color="#3678D7"
        loading={loading}
        cssOverride={override}
        size={100}
      />
    </div>
  );
};

export default Loading;
