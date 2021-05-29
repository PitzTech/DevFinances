export default function Modal({ animateClasses = [] }){
    
    const wrapper = document.querySelector(".modal-overlay")
    const element = document.querySelector(".modal")
    const cancelButton = element.querySelector(".button.cancel")

    cancelButton.addEventListener("click", close)
    
    function open(){
        document.addEventListener("keydown", closeOnEscape)

        wrapper.classList.add("active")
        element.classList.add(...animateClasses)
    }
    function close(){
        document.removeEventListener("keydown", closeOnEscape)
        
        wrapper.classList.remove("active")
        element.classList.remove(...animateClasses)
    }
    function closeOnEscape({ key }){
        if(key == "Escape") 
            close()
    }

    return {
        open,
        close
    }
}