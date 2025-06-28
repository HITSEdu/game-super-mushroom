import {useModalStore} from "../../store/ModalStore.ts";

const ItemModal = () => {
  const {content} = useModalStore();

  if (!content) return null;

  return (
    <div className="fixed inset-0 z-[1002] bg-black/50 backdrop-blur-sm flex-center">
      <div className="bg-[#1e1e1e] border border-gray-700 p-4 max-h-[85vh] rounded w-full max-w-md mx-4 text-white">
        {content}
      </div>
    </div>
  );
};

export default ItemModal;