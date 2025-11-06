// ---------- Data ----------
const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaraunt Terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An Outdoor Cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.body.classList.add("no-scroll");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.body.classList.remove("no-scroll");
}

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", () => {
  profileNameInput.value = profileNameEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});
editProfileCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameEl.textContent = profileNameInput.value.trim();
  profileDescriptionEl.textContent = profileDescriptionInput.value.trim();
  closeModal(editProfileModal);
});

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const addCardFormEl = newPostModal.querySelector(".modal__form");
const linkInput = addCardFormEl.querySelector("#card-image-input");
const nameInput = addCardFormEl.querySelector("#card-description-input");

newPostBtn.addEventListener("click", () => openModal(newPostModal));
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewImg = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const imgEl = cardElement.querySelector(".card__image");
  const titleEl = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-btn");
  const deleteBtn = cardElement.querySelector(".card__delete-btn");

  imgEl.src = data.link;
  imgEl.alt = data.name;
  titleEl.textContent = data.name;

  likeBtn.addEventListener("click", () => {
    const isActive = likeBtn.classList.toggle("card__like-btn_active");
    likeBtn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  imgEl.addEventListener("click", () => {
    previewCaption.textContent = data.name;
    previewImg.src = data.link;
    previewImg.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

initialCards.forEach((item) => {
  cardsList.prepend(getCardElement(item));
});

addCardFormEl.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: nameInput.value.trim(),
    link: linkInput.value.trim(),
  };
  if (!newCard.name || !newCard.link) return;
  cardsList.prepend(getCardElement(newCard));
  closeModal(newPostModal);
  addCardFormEl.reset();
});
