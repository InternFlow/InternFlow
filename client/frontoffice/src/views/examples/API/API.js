import axios from "axios";

// *********** Send email
export const SendEmail = async ({ fullName, email, message, setSend }) => {
  try {
    const datas = { fullName, email, message };
    let res = await axios.post(`http://localhost:5000/send`, datas);
    if (res) {
      setSend(res.data);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
