"use strict";

import gallery from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");
const img = document.querySelector(".lightbox__image");
const imgLink = document.querySelector(".js-lightbox");
const button = document.querySelector("button[data-action='close-lightbox']");
const overlay = document.querySelector(".lightbox__overlay");

//Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryItem = gallery.reduce(function(acc, item) {
  const liItem = document.createElement("li");
  liItem.classList.add("gallery__item");

  const linkItem = document.createElement("a");
  linkItem.classList.add("gallery__link");
  linkItem.href = item.original;

  const imgItem = document.createElement("img");
  imgItem.classList.add("gallery__image");
  imgItem.src = item.preview;
  imgItem.dataset.source = item.original;
  imgItem.alt = item.description;

  linkItem.appendChild(imgItem);
  liItem.appendChild(linkItem);

  return acc + liItem.outerHTML;
}, "");

galleryList.insertAdjacentHTML("beforeend", galleryItem);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения

function handleClick(e) {
  e.preventDefault();
  const target = e.target;
  setActiveLink(target.getAttribute("data-source"), target.getAttribute("alt"));
}

function setActiveLink(activeLink, alt) {
  img.src = activeLink;
  img.alt = alt;
  if (!imgLink.classList.contains("is-open")) {
    openModal();
  }
}

// Открытие модального окна по клику на элементе галереи.
function openModal() {
  imgLink.classList.add("is-open");
}

// Очистка значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
function closeModal(e) {
  if (e.target.nodeName !== "IMG") {
    const modal = document.querySelector(".lightbox");
    modal.classList.remove("is-open");
    img.src = "";
    img.alt = "";
  }
}

galleryList.addEventListener("click", handleClick);

button.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
