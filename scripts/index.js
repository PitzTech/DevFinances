import Modal from "./modal.js"

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const newButton = document.querySelector("#transaction .button.new")

newButton.addEventListener("click", modal.open)