// Seleção de Elementos
const generatePasswordBtn = document.querySelector("#generate-password");
const generatedPasswordEl = document.querySelector("#generated-password");

const openCloseGeneratorBtn = document.querySelector("#open-generate-password");
const generatePasswordConatiner = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolInput = document.querySelector("#symbol");
const copyPasswordBtn = document.querySelector("#copy-password");

// Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10);
};

const getSymbol = () => {
  const symbols = "()*&%$#@!+_{}[]";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  const passwordLength = +lengthInput.value;

  const generator = [];

  if (lettersInput.checked) {
    generator.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numbersInput.checked) {
    generator.push(getNumber);
  }

  if (symbolInput.checked) {
    generator.push(getSymbol);
  }

  console.log(generator.length);

  if (generator.length === 0) {
    return;
  }

  for (i = 0; i < passwordLength; i = i + generator.length) {
    generator.forEach(() => {
      const randomValue =
        generator[Math.floor(Math.random() * generator.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);

  generatedPasswordEl.style.display = "block";
  generatedPasswordEl.querySelector("h4").innerText = password;
};
// Eventos

generatePasswordBtn.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

openCloseGeneratorBtn.addEventListener("click", () => {
  generatePasswordConatiner.classList.toggle("hide");
});

copyPasswordBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordEl.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPasswordBtn.innerText = "Senha copiada com sucesso!";

    setTimeout(() => {
      copyPasswordBtn.innerText = "Copiar";
    }, 1000);
  });
});
