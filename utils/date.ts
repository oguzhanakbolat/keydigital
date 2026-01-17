const dateFormatter = (date: string) => {
  return date.split("-").reverse().join("-");
};

export default dateFormatter;
