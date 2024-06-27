import { useState } from "react"
import { IoIosArrowRoundDown } from "react-icons/io"
import { LuSendHorizonal } from "react-icons/lu"
import { MdLoop } from "react-icons/md"

interface ModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  // State for the user's input in the prompt
  const [userPrompt, setUserPrompt] = useState("")

  // State for the regenerate input field
  const [regeneratePrompt, setRegeneratePrompt] = useState("")

  // State to check if the response has been generated
  const [isResponseGenerated, setIsResponseGenerated] = useState(false)

  // State for the generated response
  const [generatedResponse, setGeneratedResponse] = useState("")

  const DUMMY_RESPONSE = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask`

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false)
  }

  // Function to handle overlay click and close modal if open
  const handleOverlayClick = () => {
    if (isOpen) closeModal()
  }

  const placeholderElement = document.querySelector(
    ".msg-form__placeholder"
  ) as HTMLDivElement
  // Function to handle the insertion of generated response into the LinkedIn message textarea
  const handleInsertResponse = () => {
    closeModal()
    placeholderElement.style.display = "none"

    const textarea = document.querySelector(
      ".msg-form__contenteditable"
    ) as HTMLTextAreaElement

    textarea.children[0].innerHTML = DUMMY_RESPONSE
    setIsResponseGenerated(false)
    setUserPrompt("")
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 inset-0 w-full h-full flex justify-center align-center bg-black/25"
          onClick={handleOverlayClick}>
          {!isResponseGenerated ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center self-center p-4 h-fit w-[550px] bg-gray-100 rounded-[12px] text-2xl">
              <input
                type="text"
                name="prompt"
                placeholder="Your prompt"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="mb-6 mx-8 p-[10px] w-full text-xl font-medium text-gray-600 placeholder:text-gray-500 rounded-md border-gray-300 focus:ring-0 focus:border-gray-400"
              />
              <button
                onClick={() => setIsResponseGenerated(true)}
                disabled={!userPrompt}
                className="flex items-center justify-around self-end p-3 w-40 text-xl font-medium text-white bg-blue-500 rounded-lg">
                <LuSendHorizonal className="text-2xl" />
                <p>Generate</p>
              </button>
            </div>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center self-center p-4 h-fit w-[550] bg-gray-100 rounded-lg gap-5">
              {/* Display the user input and generated response */}
              <div className="flex flex-col gap-10 text-xl font-semibold">
                <p className="self-end w-[60%] p-3 text-gray-600 bg-gray-200 rounded-lg">
                  {userPrompt}
                </p>
                <p className="self-start w-[60%] p-3 text-gray-800 bg-blue-300 rounded-lg">
                  {DUMMY_RESPONSE}
                </p>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="prompt"
                  placeholder="Your prompt"
                  value={regeneratePrompt}
                  onChange={(e) => setRegeneratePrompt(e.target.value)}
                  className="mb-6 w-full  p-[10px] text-xl font-semibold text-gray-600 placeholder:text-gray-500 rounded-md border-gray-300 focus:ring-0 focus:border-gray-400"
                />
              </div>
              <div className="flex items-center gap-5 self-end">
                <button
                  onClick={handleInsertResponse}
                  className="flex  items-center justify-around self-end p-3 w-32 font-semibold text-xl  text-gray-600 bg-white border border-gray-600 rounded-lg">
                  <IoIosArrowRoundDown className="text-3xl" />
                  <p>Insert</p>
                </button>
                <button
                disabled={true}
                className="flex items-center justify-around self-end p-3 w-40 text-xl font-semibold text-white bg-blue-500 rounded-lg">
                  <MdLoop className="text-xl" />
                  <p>Regenerate</p>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Modal
