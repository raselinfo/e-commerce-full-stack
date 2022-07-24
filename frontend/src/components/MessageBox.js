import DOMPurify from "dompurify";
const MessageBox = ({ error, message }) => {
  let text = error ? `❌ ${error}` : { message };
  return (
    <div
      className={`md:w-6/12 p-5 mx-auto mt-5 ${
        error ? "bg-red-300" : "bg-green-200"
      }   h-44 rounded-xl text-gray-500 flex items-center justify-center text-5xl font-bold`}
    >
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></p>
    </div>
  );
};

export default MessageBox;
