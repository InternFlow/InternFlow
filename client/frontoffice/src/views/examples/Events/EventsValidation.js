const validateTitle = ({ title, settitleError }) => {
  return title && title.length < 5
    ? settitleError("Title is too short")
    : title && title.length > 50
    ? settitleError("Title is too long")
    : settitleError("");
};

const validateCreator = ({ creator, setcreatorError }) => {
  return creator && creator.length < 3
    ? setcreatorError("Creator name is too short")
    : creator && creator.length > 50
    ? setcreatorError("Creator name is too long")
    : setcreatorError("");
};

const validateMessage = ({ message, setMessageError }) => {
  return message && message.length < 5
    ? setMessageError("Message is too short")
    : message && message.length > 200
    ? setMessageError("Try to make short and meanfull")
    : setMessageError("");
};

const validateDescription = ({ description, setDescriptionError }) => {
  return description && description.length < 5
    ? setDescriptionError("Description is too short")
    : description && description.length > 200
    ? setDescriptionError("Description is too long")
    : setDescriptionError("");
};

const validateType = ({ place, settypeError }) => {
  const allowedValues = ["Onsite", "Remote", "Hybride"];

  if (!place) {
    settypeError("Type cannot be empty");
  } else if (!allowedValues.includes(place)) {
    settypeError("Invalid type");
  } else {
    settypeError("");
  }
};
const validateCategory = ({ category, setCategoryError }) => {
  const allowedValues = [
    "SPORTS",
    "BUSINESS",
    "POLITICAL",
    "TECHNOLOGY",
    "DESIGN",
    "MARKETING",
  ];

  if (!category) {
    setCategoryError("Category cannot be empty");
  } else if (!allowedValues.includes(category)) {
    setCategoryError("Invalid category");
  } else {
    setCategoryError("");
  }
};
const validatedate = ({ date, setdateError }) => {
  if (!date) {
    setdateError("Date cannot be empty");
  } else {
    setdateError("");
  }
};

const validatePoster = ({ imageBase64, setPosterError }) => {
  if (!imageBase64) {
    setPosterError("Poster cannot be empty");
  } else {
    setPosterError("");
  }
};

const validatephone = ({ phone, setphoneError }) => {
  if (!phone) {
    setphoneError("Phone cannot be empty");
  } else {
    setphoneError("");
  }
};
const validateAddress = ({ address, type, setAddressError }) => {
  if (!type) {
    setAddressError("");
  } else if (!address) {
    setAddressError("Address cannot be empty");
  } else {
    setAddressError("");
  }
};

export {
  validateTitle,
  validateCreator,
  validateMessage,
  validateDescription,
  validateType,
  validateCategory,
  validatedate,
  validatePoster,
  validatephone,
  validateAddress,
};
