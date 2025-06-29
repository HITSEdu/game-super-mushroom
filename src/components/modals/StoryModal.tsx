import {useState, type ReactNode, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useModalStore} from "../../store/ModalStore";

interface StoryPage {
  title?: string;
  content: string | ReactNode;
  image?: string;
}

interface StoryModalProps {
  pages: StoryPage[];
  onComplete?: () => void;
  onSecondary?: () => void;
  secondaryLabel?: string;
  primaryLabel?: string;
  backgroundColor?: string;
  hideDefaultButtons?: boolean;
}

const StoryModal = ({
                      pages,
                      onComplete,
                      onSecondary,
                      secondaryLabel,
                      primaryLabel,
                      backgroundColor = "bg-black/90",
                    }: StoryModalProps) => {
  const [page, setPage] = useState(0);
  const {t} = useTranslation("translations");
  const close = useModalStore(state => state.close);

  const handleNext = () => setPage(prev => prev + 1);
  const handleBack = () => setPage(prev => Math.max(prev - 1, 0));
  const handleClose = () => {
    onComplete?.();
    close();
  };
  const handleSecondary = () => {
    onSecondary?.();
    close();
  };

  const currentPage = pages[page];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (page < pages.length - 1) {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, pages.length]);

  return (
    <div
      className={`modal-content text-white p-4 rounded-xl max-w-lg mx-auto`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundColor})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      {currentPage.image && (
        <img
          src={currentPage.image}
          alt=""
          className="mb-4 max-h-32 mx-auto object-contain"
        />
      )}

      <div className="mb-6 text-base">
        {currentPage.content}
      </div>

      <div className="flex justify-between gap-2">
        {page > 0 ? (
          <button
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            {t("back")}
          </button>
        ) : <div />}

        {page < pages.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {t("next")}
          </button>
        ) : (
          <div
            className={`flex gap-2 ${
              onComplete && onSecondary || pages.length !== 1 ? "ml-auto" : "justify-center w-full"
            }`}
          >
            {onComplete && onSecondary && (
              <>
                <button
                  onClick={handleSecondary}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  {t(secondaryLabel || "leave")}
                </button>
                <button
                  onClick={handleClose}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  {t(primaryLabel || "fountain.understood", "Understood")}
                </button>
              </>
            )}

            {!onComplete && onSecondary && (
              <button
                onClick={handleSecondary}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mx-auto"
                style={{minWidth: 120}}
              >
                {t(secondaryLabel || "leave")}
              </button>
            )}

            {onComplete && !onSecondary && (
              <button
                onClick={handleClose}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {t(primaryLabel || "fountain.understood", "Understood")}
              </button>
            )}

            {!onComplete && !onSecondary && (
              <button
                onClick={handleClose}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {t("fountain.understood", "Understood")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryModal;