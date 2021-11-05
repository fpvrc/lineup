export const getName = (str: string) => {
  try {
    let split = str.split(" ");
    let name = `${split[0]} ${
      typeof split[1] !== "undefined" ? `${split[1].substring(0, 1)}.` : ""
    }`;
    return name;
  } catch (error) {}
};

export const validateInput = (value) => {
  return !value || value.match(/^ *$/) ? false : true;
};
